import React from 'react';
import { contactData } from '../../data/data';

const ContactInfo = () => {
  const { address, phone, email } = contactData;
  return (
    <div className="contact-info">
      <h2>Contact Information</h2>
      <p>
        <i className="fas fa-map-marker-alt"></i> {address}
      </p>
      <p>
        <i className="fas fa-phone"></i> {phone}
      </p>
      <p>
        <i className="fas fa-envelope"></i> {email}
      </p>
    </div>
  );
};

export default ContactInfo;
