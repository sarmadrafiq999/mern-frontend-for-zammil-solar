import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaEnvelope,
  FaPhone,
  FaTools,
  FaTrash,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "./AdminUsers.css";

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorization } = useAuth();

  // Fetch all users
  const getAllUsers = async () => {
    try {
      const response = await fetch(
        "https://zammil-backend-production.up.railway.app/api/admin/users",
        {
          method: "GET",
          headers: {
            Authorization: authorization,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        toast.error("Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users. Please try again.");
    }
  };

  // Delete a user by ID
  const deleteUser = async (id) => {
    try {
      const response = await fetch(
        `https://zammil-backend-production.up.railway.app/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorization,
          },
        }
      );
      if (response.ok) {
        toast.success("User deleted successfully");
        getAllUsers();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user. Please try again.");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="admin-users-container">
      <h2>User List</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <span className="admin-users-th-content">
                  Username <FaUser />
                </span>
              </th>
              <th>
                <span className="admin-users-th-content">
                  Email <FaEnvelope />
                </span>
              </th>
              <th>
                <span className="admin-users-th-content">
                  Phone <FaPhone />
                </span>
              </th>
              <th>
                <span className="admin-users-th-content">
                  Actions <FaTools />
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <div className="admin-users-actions-btn-container">
                    <Link to={`/admin/users/${item._id}/edit`}>
                      <button className="admin-users-edit-btn">
                        <FaEdit /> Edit
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this user?"
                          )
                        ) {
                          deleteUser(item._id);
                        }
                      }}
                      className="admin-users-delete-btn"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
