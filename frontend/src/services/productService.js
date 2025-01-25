import axios from "axios";

const BASE_URL = "http://localhost:8000/api/products";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${productId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axios.post(BASE_URL, productData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${productId}`, productData);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${productId}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  console.error("API call failed:", error);
  throw error.response?.data?.message || "Something went wrong!";
};
