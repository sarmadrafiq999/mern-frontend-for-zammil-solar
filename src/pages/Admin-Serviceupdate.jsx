import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AdminServiceUpdate = () => {
  const navigate = useNavigate();
  const [getService, setgetService] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    img: "",
  });
  const params = useParams();
  const { authorization } = useAuth();
  const fetchServices = async () => {
    try {
      const response = await fetch(
        `https://zammil-backend-production.up.railway.app/api/admin/getadminservices/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorization,
          },
        }
      );

      const data = await response.json();
      console.log("Admin  update Services", data);
      setgetService({
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        price: data.price || "",
        img: data.img || "",
      });
    } catch (error) {
      console.log("Error from the admin update services:", error);
    }
  };
  //   Handle Submitt function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://zammil-backend-production.up.railway.app/api/admin/getadminservices/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(getService),
        }
      );
      if (response.ok) {
        setgetService({
          title: "",
          description: "",
          category: "",
          price: "",
          img: "",
        });
        toast.success("updated successfully");
        navigate("/admin/allServices");
      } else {
        toast.error("not updated");
      }
    } catch (error) {
      toast.error("can not fetch data from the service API");
    }
  };
  //   handleChange
  const handleChange = (e) => {
    setgetService({
      ...getService,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="form-wrapper">
      <form className="product-form" onSubmit={handleSubmit}>
        <h2>Add Product</h2>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={getService.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={getService.description}
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
            value={getService.category}
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
            value={getService.price}
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
            value={getService.img}
            onChange={handleChange}
            placeholder="Paste image URL here"
          />
        </div>

        {getService.img && (
          <div className="image-preview">
            <p>Image Preview:</p>
            <img
              src={getService.img.trim()}
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
