import axios from "axios";
const API_BASE_URL = `${process.env.REACT_APP_API_URL}/books`;
export const getAllbooks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    if (response.data && response.data.isSuccess) {
      return response.data.data;
    }
  } catch (e) {
    return [];
  }
};

export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    if (response.data && response.data.isSuccess) {
      return response.data.data;
    }
  } catch (e) {
    return {};
  }
};

export const updateBook = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    if (response.data && response.data.isSuccess) {
      return response.data.data;
    }
  } catch (e) {
    return null;
  }
};
export const createNewBook = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, data);
    if (response.data && response.data.isSuccess) {
      return response.data.data;
    }
  } catch (e) {
    if (
      e.status === 406 &&
      e.response.data.msg &&
      /is required/.test(e.response.data.msg)
    ) {
      throw new Error("Some fields are required");
    }
    return null;
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    if (response.data && response.data.isSuccess) {
      return response.data.data;
    }
  } catch (e) {
    return null;
  }
};
