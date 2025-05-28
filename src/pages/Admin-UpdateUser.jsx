import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import "./AdminUserUpdate.css";

export const AdminUserUpadte = () => {
  const [user, setuserData] = useState({
    username: "",
    phone: "",
    email: "",
    password: "",
  });
  const params = useParams();
  const { authorization } = useAuth();

  // Getting singal user data
  const getSingleUserdata = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/users/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorization,
          },
        }
      );
      const result = await response.json();
      const data = result.data;
      console.log("this is the user to update ", result);
      setuserData({
        username: data.username || "",
        phone: data.phone || "",
        email: data.email || "",
        password: "",
      });
    } catch (error) {
      toast.error("error in getting singal user data");
    }
  };
  useEffect(() => {
    getSingleUserdata();
  }, []);
  const handleInput = (e) => {
    setuserData({
      ...user,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/users/update/${params.id}`,
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
        toast.success("updated successfully");
      } else {
        toast.error("not updated");
      }
    } catch (error) {
      toast.error("Could not fetch user data");
    }
  };
  return (
    <>
      <div className="admin-update-container">
        <h2 className="admin-update-heading">Update User Info</h2>
        <form className="admin-update-form" onSubmit={handleSubmitt}>
          <label className="admin-update-label">
            Username
            <input
              type="text"
              name="username"
              className="admin-update-input"
              value={user.username}
              onChange={handleInput}
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
            />
          </label>
          <button type="submit" className="admin-update-button">
            Update User
          </button>
        </form>
      </div>
    </>
  );
};
