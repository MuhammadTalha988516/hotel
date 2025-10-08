import React, { useEffect, useState } from 'react';
import Hero from '../home/Hero';
import Services from '../home/Services';
import FeaturedRooms from '../home/FeaturedRooms';
import Testimonials from '../home/Testimonials';
import { ApiService } from '../services/ApiService';

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await ApiService.getHomeData();
        setHomeData(data);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <Hero />
      <Services />
      <FeaturedRooms />
      <Testimonials />
    </div>
  );
};

export default Home;
