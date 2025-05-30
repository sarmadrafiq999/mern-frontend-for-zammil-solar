import React, { useState, useEffect } from "react";
import "./Contact.css";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Contact() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        message: "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://zammil-backend-production.up.railway.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ username: "", email: "", message: "" });
        navigate("/");
      } else {
        toast.error(
          data.extraDetails || data.message || "Something went wrong."
        );
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later.");
      console.error("Contact form error:", error);
    }
  };

  return (
    <section className="contact-form-section">
      <div className="contact-form-container">
        <h1 className="contact-form-title">Contact Us</h1>

        <form className="contact-form-body" onSubmit={handleSubmit}>
          <input
            className="contact-form-input"
            type="text"
            name="username"
            placeholder="Your Name"
            value={formData.username}
            onChange={handleInputChange}
            required
          />

          <input
            className="contact-form-input"
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <textarea
            className="contact-form-textarea"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>

          <button className="contact-form-button" type="submit">
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
