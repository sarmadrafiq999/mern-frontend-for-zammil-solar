import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";
import "./AdminContacts.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

export const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const { token } = useAuth();

  const getAllContacts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://zammil-backend-production.up.railway.app/api/admin/contacts",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmed) return;

    setDeletingId(id);
    try {
      const response = await fetch(
        `https://zammil-backend-production.up.railway.app/api/admin/contacts/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        toast.success("Contact deleted successfully");
        getAllContacts();
      } else {
        toast.error("Failed to delete contact");
      }
    } catch (error) {
      toast.error(error.message || "Failed to delete contact");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    getAllContacts();
  }, []);

  return (
    <div className="admin-contacts-container">
      <h1>Contacts List</h1>
      {loading ? (
        <p>Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p>No contacts found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Message</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.username}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>
                  <Link to={`/admin/contacts/${contact._id}/edit`}>
                    <FaEdit className="action-icon edit" title="Edit Contact" />
                  </Link>
                  <button
                    onClick={() => deleteContact(contact._id)}
                    className="delete-btn"
                    title="Delete Contact"
                    disabled={deletingId === contact._id}
                  >
                    <FaTrash className="action-icon delete" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
