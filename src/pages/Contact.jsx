import React, { useState, useEffect } from "react";
import "./Contact.css";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Contact() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [contactData, setContactData] = useState({
    username: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setContactData({
        username: user.username || "",
        email: user.email || "",
        message: "",
      });
    }
  }, [user]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/contact-us",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Message sent successfully!");
        setContactData({ username: "", email: "", message: "" });
        navigate("/");
      } else {
        toast.error(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      toast.error("Failed to send message. Try again later.");
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
            value={contactData.username}
            onChange={handleInput}
            required
          />

          <input
            className="contact-form-input"
            type="email"
            name="email"
            placeholder="Your Email"
            value={contactData.email}
            onChange={handleInput}
            required
          />

          <textarea
            className="contact-form-textarea"
            name="message"
            placeholder="Your Message"
            value={contactData.message}
            onChange={handleInput}
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
