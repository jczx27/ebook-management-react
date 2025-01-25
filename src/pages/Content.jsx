import React, { useEffect, useState } from "react";
import {
  getAllbooks,
  getBookById,
  deleteBook,
  createNewBook,
  updateBook,
} from "@src/api/bookService";

const Content = () => {
  const [books, setItems] = useState([]);
  const fields = [
    { label: "Name", field: "name" },
    { label: "ISBN", field: "isbn" },
    { label: "Author", field: "author" },
    { label: "Genre", field: "genre" },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getAllbooks();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleEdit = async (id, updatedData) => {
    await updateBook(id, updatedData);
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const handleDelete = async (id) => {
    try {
      let result = await deleteBook(id);
      if (result) {
        alert("Book is deleted");
        setItems((prev) => prev.filter((item) => item._id !== id));
      } else {
        alert(`Book is not deleted!`);
      }
    } catch (e) {
      alert(`Book is not deleted!`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <table className="min-w-full bg-white border-collapse border border-gray-300 shadow-md rounded-lg">
        <thead key="thead">
          <tr
            key="table_header"
            className="bg-gray-200 text-left text-sm uppercase text-gray-600"
          >
            {fields.map((field) => (
              <th
                key={`header_${field.label}`}
                className="py-3 px-4 border border-gray-300 text-center"
              >
                {field.label}
              </th>
            ))}
            <th
              key="header_actions"
              className="py-3 px-4 border border-gray-300 text-center"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody key="tbody">
          {books.length > 0 ? (
            books.map((item) => (
              <tr
                key={`row_${item._id}`}
                className="hover:bg-gray-100 transition text-gray-800"
              >
                {fields.map((field) => (
                  <td
                    key={`${item._id}_${item[field.field]}`}
                    className="py-3 px-4 border border-gray-300 text-center"
                  >
                    {item[field.field]}
                  </td>
                ))}
                <td className="py-3 px-4 flex space-x-2">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white text-sm px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center py-4 text-gray-500">
                No items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Content;
