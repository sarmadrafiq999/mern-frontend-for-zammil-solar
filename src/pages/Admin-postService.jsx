import React, { useState } from "react";
import "./ProductForm.css";
import { useAuth } from "../store/auth";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    img: "",
  });
  const { authorization } = useAuth();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // You can now send formData to your backend using fetch or axios
    try {
      const response = await fetch(
        "https://zammil-backend-production.up.railway.app/api/admin/adminservices",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
          body: JSON.stringify(formData),
        }
      );
      const result = await response.json();

      if (response.ok) {
        console.log("Success:", result);
        alert("Service submitted successfully!");
      } else {
        console.error("Server error:", result);
        alert("Failed to submit service.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="form-wrapper">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Add Product</h2>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            placeholder="Paste image URL here"
          />
        </div>

        {formData.img && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img
              src={formData.img.trim()}
              alt="Product Preview"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/150?text=Image+Not+Found";
              }}
            />{" "}
          </div>
        )}

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
