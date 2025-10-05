import React from 'react';
import { homeData } from '../../data/data';

const Services = () => {
  const { services } = homeData;
  return (
    <div className="services">
      <h2>Our Services</h2>
      <div className="service-cards">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <i className={`fas fa-${service.icon}`}></i>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
