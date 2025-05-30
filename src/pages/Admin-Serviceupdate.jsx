import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const AdminServiceUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { authorization } = useAuth();

  const [service, setService] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    img: "",
  });

  // Fetch single service data by ID
  const fetchService = async () => {
    try {
      const response = await fetch(
        `https://zammil-backend-production.up.railway.app/api/admin/getadminservices/${id}`,
        {
          method: "GET",
          headers: { Authorization: authorization },
        }
      );

      if (!response.ok) {
        toast.error("Failed to fetch service data");
        return;
      }

      const data = await response.json();

      if (!data) {
        toast.error("Service data not found");
        return;
      }

      // Defensive: data might be wrapped inside .data property
      const serviceData = data.data || data;

      setService({
        title: serviceData.title || "",
        description: serviceData.description || "",
        category: serviceData.category || "",
        price: serviceData.price || "",
        img: serviceData.img || "",
      });
    } catch (error) {
      toast.error("Error fetching service data");
      console.error("Fetch service error:", error);
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit (update service)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://zammil-backend-production.up.railway.app/api/admin/getadminservices/update/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(service),
        }
      );

      if (response.ok) {
        toast.success("Updated successfully");
        navigate("/admin/allServices");
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Error updating service");
      console.error("Update error:", error);
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  return (
    <div className="form-wrapper">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Update Product</h2>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={service.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={service.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={service.category}
            onChange={handleChange}
            placeholder="Enter category"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="text"
            name="price"
            id="price"
            value={service.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="img">Image URL</label>
          <input
            type="text"
            name="img"
            id="img"
            value={service.img}
            onChange={handleChange}
            placeholder="Paste image URL here"
          />
        </div>

        {service.img && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img
              src={service.img.trim()}
              alt="Product Preview"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/150?text=Image+Not+Found";
              }}
            />
          </div>
        )}

        <button type="submit" className="submit-btn">
          Update Service
        </button>
      </form>
    </div>
  );
};
