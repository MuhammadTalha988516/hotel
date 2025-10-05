import React from 'react';
import FacilityList from './components/FacilityList';
import { facilitiesData } from '../data/data';

const Facilities = () => {
  const { title } = facilitiesData;
  return (
    <div className="facilities-page">
      <h1>{title}</h1>
      <FacilityList />
    </div>
  );
};

export default Facilities;
