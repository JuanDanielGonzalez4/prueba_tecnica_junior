import { useState } from "react";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productService";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchAllProducts = async () => {
    setError(null);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || "Failed to fetch products");
    }
  };

  const addProduct = async (productData) => {
    setError(null);
    try {
      const newProduct = await createProduct(productData);
      setProducts((prevProducts) => [...prevProducts, newProduct.product]);
    } catch (err) {
      setError(err.message || "Failed to create product");
    }
  };

  const modifyProduct = async (productId, productData) => {
    setError(null);
    try {
      const updated = await updateProduct(productId, productData);
      setProducts((prevProducts) =>
        prevProducts.map((prod) =>
          prod.id === productId ? updated.product : prod
        )
      );
    } catch (err) {
      setError(err.message || "Failed to update product");
    }
  };

  const removeProduct = async (productId) => {
    setError(null);
    try {
      await deleteProduct(productId);
      setProducts((prevProducts) =>
        prevProducts.filter((prod) => prod.id !== productId)
      );
    } catch (err) {
      setError(err.message || "Failed to delete product");
    }
  };

  return {
    products,
    error,
    fetchAllProducts,
    addProduct,
    modifyProduct,
    removeProduct,
  };
};

export default useProducts;
