import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { useParams } from "react-router-dom";
import "./AdminContactUpdate.css";

export const AdminContactUpdate = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    username: "",
    email: "",
    message: "",
  });

  const { token } = useAuth();
  const { id } = useParams();

  const getSingleContactData = async () => {
    try {
      const response = await fetch(
        `https://zammil-backend-production.up.railway.app/api/admin/contacts/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!result.data) {
        toast.error("Contact not found");
        return;
      }

      const { username, email, message } = result.data;
      setUser({ username, email, message });
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    getSingleContactData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://zammil-backend-production.up.railway.app/api/admin/contacts/update/${id}`,
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
        toast.success("Contact updated successfully");
        setIsEditing(false);
      } else {
        toast.error("Failed to update contact");
      }
    } catch (error) {
      toast.error("Error while updating contact");
    }
  };

  return (
    <div className="admin-contact-update__container">
      <h1 className="admin-contact-update__title">
        Update Contact Information
      </h1>
      <form className="admin-contact-update__form" onSubmit={handleSubmit}>
        <div className="admin-contact-update__field">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            value={user.username}
            onChange={handleInput}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="admin-contact-update__field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            value={user.email}
            onChange={handleInput}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="admin-contact-update__field">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            id="message"
            placeholder="Enter message"
            rows="5"
            value={user.message}
            onChange={handleInput}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="admin-contact-update__buttons">
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="admin-contact-update__edit-btn"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>

          {isEditing && (
            <button type="submit" className="admin-contact-update__submit-btn">
              Update Now
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
