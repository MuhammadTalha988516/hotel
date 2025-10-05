import React from 'react';
import FacilityCard from './FacilityCard';
import { facilitiesData } from '../../data/data';

const FacilityList = () => {
  const { facilities } = facilitiesData;
  return (
    <div className="facility-list">
      {facilities.map((facility) => (
        <FacilityCard key={facility.id} facility={facility} />
      ))}
    </div>
  );
};

export default FacilityList;
