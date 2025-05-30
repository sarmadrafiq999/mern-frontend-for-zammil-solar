import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./AllServices.css";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const { authorization } = useAuth();

  // Fetch all services from the backend
  const fetchServices = async () => {
    try {
      const response = await fetch(
        "https://zammil-backend-production.up.railway.app/api/admin/getadminservices",
        {
          method: "GET",
          headers: { Authorization: authorization },
        }
      );

      if (!response.ok) {
        toast.error("Failed to fetch services");
        return;
      }

      const data = await response.json();

      // Defensive: data may be inside data.data depending on API
      const servicesList = data.data || data;

      setServices(servicesList);
    } catch (error) {
      toast.error("Error fetching services");
      console.error("Fetch services error:", error);
    }
  };

  // Delete a service by id
  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    try {
      const response = await fetch(
        `https://zammil-backend-production.up.railway.app/api/admin/adminservices/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: authorization },
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Service deleted successfully");
        fetchServices(); // Refresh list after deletion
      } else {
        toast.error("Failed to delete service: " + (data.message || ""));
      }
    } catch (error) {
      toast.error("Error deleting service");
      console.error("Delete service error:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="service-list-container">
      <h2 className="service-list-heading">All Services</h2>
      <div className="service-list-grid">
        {services.length > 0 ? (
          services.map((service) => (
            <div key={service._id} className="service-list-card">
              <img
                src={
                  service.img || "https://placehold.co/150x150?text=No+Image"
                }
                alt={service.title || "Service Image"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/150x150?text=Image+Not+Found";
                }}
              />
              <div className="service-list-info">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p>
                  <strong>Category:</strong> {service.category}
                </p>
                <p>
                  <strong>Price:</strong> {service.price}
                </p>
                <button
                  className="service-list-btn-delete"
                  onClick={() => deleteService(service._id)}
                >
                  Delete
                </button>
                <Link to={`/admin/update/${service._id}`}>
                  <button className="service-list-btn-edit">Edit</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No services found.</p>
        )}
      </div>
    </div>
  );
};

export default AllServices;
