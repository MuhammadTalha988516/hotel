import React, { useState } from 'react';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking logic here
    console.log('Booking submitted:', formData);
    alert('Your booking has been submitted!');
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h2>Book a Room</h2>
      <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
      <input type="date" name="checkIn" value={formData.checkIn} onChange={handleChange} required />
      <input type="date" name="checkOut" value={formData.checkOut} onChange={handleChange} required />
      <button type="submit">Submit Booking</button>
    </form>
  );
};

export default BookingForm;
