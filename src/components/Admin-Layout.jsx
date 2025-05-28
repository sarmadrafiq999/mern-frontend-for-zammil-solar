import { Navigate, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./AdminLayout.css";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { useAuth } from "../store/auth";

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <h1>Loading ...</h1>;
  }
  if (!user.isAdmin) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <h1>Welcome to Admin Panel</h1>
      <div className="admin-grid">
        <aside className="admin-sidebar">
          <nav>
            <ul>
              <li>
                <NavLink to="/admin/users">
                  <FaUser /> Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/postServices">+ Add Service</NavLink>
              </li>
              <li>
                <NavLink to="/admin/allServices">📋 All Services</NavLink>
              </li>
              <li>
                <NavLink to="/admin/contacts">
                  <FaEnvelope /> Contacts
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="admin-content">
          <Outlet /> {/* Renders nested route content */}
        </main>
      </div>
    </>
  );
};
