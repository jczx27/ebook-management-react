import React, { useEffect, useState } from "react";
import {
  getAllbooks,
  getBookById,
  deleteBook,
  createNewBook,
  updateBook,
} from "@src/api/bookService";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";

const Content = () => {
  const [books, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null); // Holds the book being edited
  const [formData, setFormData] = useState({}); // Holds the form values
  const handleClose = () => {
    setCurrentBook(null);
    setFormData({});
  };
  const fields = [
    { label: "Name", field: "name", editable: true },
    { label: "ISBN", field: "isbn" },
    { label: "Author", field: "author" },
    { label: "Published by", field: "publisher", editable: true },
    { label: "Genre", field: "genre", editable: true },
    { label: "Pages", field: "pages", editable: true, type: "number" },
    { label: "Description", field: "description", editable: true },
  ];

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getAllbooks();
      setItems(data);
    };
    fetchItems();
  }, []);

  const handleEditClicked = async (id) => {
    try {
      const book = await getBookById(id);
      if (!book) {
        setItems((prev) => prev.filter((item) => item._id !== id));
        alert("This book is no longer available");
        return;
      }
      setCurrentBook(book);
      setFormData(book);
      setIsModalOpen(true);
    } catch (e) {
      console.error(`unexpected error occured`, e);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Submit updated book details
  const handleSave = async () => {
    try {
      const result = await updateBook(currentBook._id, formData);
      // Update the local state
      if (result) {
        setItems((booksArr) =>
          booksArr.map((book) =>
            book._id === currentBook._id ? { ...book, ...formData } : book
          )
        );
        setIsModalOpen(false); // Close the modal
      } else {
        alert(`The edit is not saved`);
      }
    } catch (e) {
      alert(`The edit is not saved`);
      console.error("Failed to update book:", e);
    }
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
      console.error(`unexpected error occured`, e);
      alert(`Book is not deleted!`);
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Books</h1>
        <Table striped bordered hover size="sm">
          <thead key="thead">
            <tr key="table_header">
              {fields.map((field) => (
                <th key={`header_${field.label}`}>{field.label}</th>
              ))}
              <th key="header_actions">Actions</th>
            </tr>
          </thead>
          <tbody key="tbody">
            {books.length > 0 ? (
              books.map((item) => (
                <tr key={`row_${item._id}`}>
                  {fields.map((field) => (
                    <td key={`${item._id}_${item[field.field]}`}>
                      {item[field.field]}
                    </td>
                  ))}
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleEditClicked(item._id)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No book found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {currentBook && (
        <Modal
          backdrop="static"
          keyboard={false}
          show={isModalOpen}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit {currentBook.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {fields.map((field) => (
                <Form.Group
                  controlId={`form_${field.field}`}
                  key={`group_${field.field}`}
                >
                  <Form.Label key={`label_${field.field}`}>
                    {field.label}
                  </Form.Label>
                  {field.editable ? (
                    <Form.Control
                      type={field.type ? field.type : "text"}
                      name={field.field}
                      value={formData[field.field] || ""}
                      onChange={handleInputChange}
                      placeholder={`Enter ${field.label}`}
                    />
                  ) : (
                    <Form.Control
                      defaultValue={formData[field.field] || ""}
                      readOnly
                      plaintext
                    />
                  )}
                </Form.Group>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default Content;
