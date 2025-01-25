import { useState, useEffect } from "react";
import useProducts from "../hooks/useProduct";
import styles from "../table.module.css";

function ProductsList() {
  const {
    products,
    error,
    fetchAllProducts,
    modifyProduct,
    removeProduct,
    addProduct,
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [form, setForm] = useState({
    id: null,
    name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const [searchQuery, setSearchQuery] = useState(""); // Search query state

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const openEditModal = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
    });
    setIsCreateMode(false);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setForm({
      id: null,
      name: "",
      description: "",
      price: "",
      quantity: "",
    });
    setIsCreateMode(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm({
      id: null,
      name: "",
      description: "",
      price: "",
      quantity: "",
    });
  };

  const saveEdit = async () => {
    try {
      await modifyProduct(form.id, {
        name: form.name,
        description: form.description,
        price: form.price,
        quantity: form.quantity,
      });
      closeModal();
    } catch (err) {
      console.error("Failed to save changes:", err);
    }
  };

  const saveCreate = async () => {
    try {
      await addProduct({
        name: form.name,
        description: form.description,
        price: form.price,
        quantity: form.quantity,
      });
      closeModal();
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "100%",
            boxSizing: "border-box",
            marginBottom: "10px",
          }}
        />
        <button
          className={styles["create-btn"]}
          onClick={openCreateModal}
          style={{ marginTop: "10px" }}
        >
          Add Product
        </button>
      </div>

      {error && <p>Error: {error}</p>}

      <table className={styles["product-table"]}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button
                  className={styles["edit-btn"]}
                  onClick={() => openEditModal(product)}
                >
                  Edit
                </button>
                <button
                  className={styles["delete-btn"]}
                  onClick={() => removeProduct(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div style={modalStyles.overlay}>
          <div style={modalStyles.modal}>
            <h2>{isCreateMode ? "Add Product" : "Edit Product"}</h2>
            <form>
              <div>
                <label>Name:</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <label>Description:</label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Price:</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: e.target.value })
                  }
                />
              </div>
            </form>
            <div style={{ marginTop: "20px" }}>
              <button onClick={isCreateMode ? saveCreate : saveEdit}>
                {isCreateMode ? "Create" : "Save"}
              </button>
              <button onClick={closeModal} style={{ marginLeft: "10px" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsList;

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "black",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
};
