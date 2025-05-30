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
import "./AdminUsers.css";

export const AdminUsers = () => {
  const [user, setUser] = useState([]);
  const { authorization } = useAuth();

  const getAllusers = async () => {
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
      setUser(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const GetId = async (id) => {
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
        getAllusers(); // Refresh the user list
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error while deleting user:", error);
    }
  };

  useEffect(() => {
    getAllusers();
  }, []);

  return (
    <div className="admin-users-container">
      <h2>User List</h2>
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
          {user.map((item, index) => (
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
                        GetId(item._id);
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
    </div>
  );
};
