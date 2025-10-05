import React from 'react';

const Testimonials = () => {
  // Add some dummy testimonials
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      quote: 'The best hotel I have ever stayed in. The staff was friendly and the rooms were clean and comfortable.',
    },
    {
      id: 2,
      name: 'Jane Smith',
      quote: 'I had a wonderful time at this hotel. The food was delicious and the amenities were top-notch.',
    },
    {
      id: 3,
      name: 'Peter Jones',
      quote: 'I would highly recommend this hotel to anyone looking for a luxurious and relaxing vacation.',
    },
  ];

  return (
    <div className="testimonials">
      <h2>What Our Guests Say</h2>
      <div className="testimonial-cards">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <p>"{testimonial.quote}"</p>
            <h4>- {testimonial.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
