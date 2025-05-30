import React, { useEffect, useState } from "react";
import "./services.css";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("https://zammil-backend-production.up.railway.app/api/service")
      .then((res) => res.json())
      .then((data) => setServices(data.response))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div className="public-service-container">
      <h2 className="public-service-heading">Our Services</h2>
      {services.map((service, index) => (
        <div key={index} className="public-service-wrapper">
          <div className="public-service-card">
            <div className="public-service-text">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <strong>{service.price}</strong>
            </div>
            <div className="public-service-image">
              <img src={service.img} alt={service.title} />
            </div>
          </div>
          {/* Divider moved here */}
          <div className="public-service-divider"></div>
        </div>
      ))}
    </div>
  );
};

export default Services;
