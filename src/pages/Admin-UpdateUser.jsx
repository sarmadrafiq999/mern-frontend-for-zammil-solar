import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "./AdminUserUpdate.css";

export const AdminUserUpdate = () => {
  const [user, setUserData] = useState({
    username: "",
    phone: "",
    email: "",
  });

  const params = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  // Fetch single user data
  const getSingleUserData = async () => {
    try {
      const response = await fetch(
        `https://zammil-backend-production.up.railway.app/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      const data = result.data;

      setUserData({
        username: data.username || "",
        phone: data.phone || "",
        email: data.email || "",
      });
    } catch (error) {
      toast.error("Error fetching user data.");
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    setUserData({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://zammil-backend-production.up.railway.app/api/admin/users/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        toast.success("User updated successfully.");
        navigate("/admin/users"); // Redirect back to user list
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to update user.");
      }
    } catch (error) {
      toast.error("Error updating user. Please try again.");
    }
  };

  return (
    <div className="admin-update-container">
      <h2 className="admin-update-heading">Update User Info</h2>
      <form className="admin-update-form" onSubmit={handleSubmit}>
        <label className="admin-update-label">
          Username
          <input
            type="text"
            name="username"
            className="admin-update-input"
            value={user.username}
            onChange={handleInput}
            required
          />
        </label>

        <label className="admin-update-label">
          Phone
          <input
            type="text"
            name="phone"
            className="admin-update-input"
            value={user.phone}
            onChange={handleInput}
            required
          />
        </label>

        <label className="admin-update-label">
          Email
          <input
            type="email"
            name="email"
            className="admin-update-input"
            value={user.email}
            onChange={handleInput}
            required
          />
        </label>

        <button type="submit" className="admin-update-button">
          Update User
        </button>
      </form>
    </div>
  );
};
