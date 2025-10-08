import React from 'react';

const FacilityCard = ({ facility }) => {
  const { name, description, image } = facility;
  return (
    <div className="facility-card">
      <img src={image} alt={name} />
      <div className="facility-card-content">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default FacilityCard;
