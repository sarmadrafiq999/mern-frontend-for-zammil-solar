import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import { useParams } from "react-router-dom";
import "./AdminContactUpdate.css"; // ✅ Import unique CSS

export const AdminContactUpdate = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [user, setData] = useState({
    username: "",
    email: "",
    message: "",
  });

  const params = useParams();
  const { authorization } = useAuth();

  const getSingleContactData = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/contacts/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorization,
          },
        }
      );

      const result = await response.json();
      const data = result.data;

      if (!data) {
        toast.error("Contact not found");
        return;
      }

      setData({
        username: data.username || "",
        email: data.email || "",
        message: data.message || "",
      });
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    getSingleContactData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setData({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/contacts/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
          body: JSON.stringify(user),
        }
      );

      if (response.ok) {
        toast.success("Contact updated successfully");
        setIsEditing(false);
        setData({
          username: "",
          email: "",
          message: "",
        });
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
          autoComplete="off"
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
          autoComplete="off"
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
          autoComplete="off"
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
          onClick={() => setIsEditing(!isEditing)}
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
