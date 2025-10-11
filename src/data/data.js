export const Room = [
    {
      id: 1,
      name: "Pearl Continental Hotel Lahore",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
      rating: 9.2,
      reviews: 3421,
      location: "Mall Road, Lahore",
      distance: "1.2 km from center",
      price: 25000,
      originalPrice: 32000,
      facilities: ["Free WiFi", "Pool", "Spa", "Restaurant", "Parking"],
      discount: 22
    },
    {
      id: 2,
      name: "Avari Hotel Lahore",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
      rating: 8.8,
      reviews: 2156,
      location: "Mall Road, Lahore",
      distance: "0.8 km from center",
      price: 22000,
      originalPrice: 28000,
      facilities: ["Free WiFi", "Restaurant", "Gym", "AC"],
      discount: 21
    },
    {
      id: 3,
      name: "Nishat Hotel Johar Town",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      rating: 8.5,
      reviews: 1876,
      location: "Johar Town, Lahore",
      distance: "5.2 km from center",
      price: 15000,
      originalPrice: 18500,
      facilities: ["Free WiFi", "Restaurant", "Parking"],
      discount: 19
    },
    {
      id: 4,
      name: "Luxus Grand Hotel",
      image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
      rating: 9.0,
      reviews: 2890,
      location: "Gulberg III, Lahore",
      distance: "3.5 km from center",
      price: 18000,
      originalPrice: 23000,
      facilities: ["Free WiFi", "Pool", "Restaurant", "Gym", "Spa"],
      discount: 22
    }
  ];

export const homeData = {
  banner: {
    title: 'Welcome to our Hotel',
    subtitle: 'Experience luxury and comfort like never before.',
    image: 'https://via.placeholder.com/1200x400.png?text=Hotel+Banner',
  },
  services: [
    {
      id: 1,
      title: '24/7 Room Service',
      description: 'Our staff is available around the clock to cater to your needs.',
      icon: 'concierge-bell',
    },
    {
      id: 2,
      title: 'Free Wi-Fi',
      description: 'Stay connected with high-speed internet access throughout the hotel.',
      icon: 'wifi',
    },
    {
      id: 3,
      title: 'Swimming Pool',
      description: 'Relax and unwind in our beautiful swimming pool.',
      icon: 'swimming-pool',
    },
  ],
};

export const aboutData = {
  title: 'About Us',
  description: 'We are a luxury hotel committed to providing our guests with the best possible experience. Our hotel is located in the heart of the city, and we offer a wide range of amenities and services to make your stay as comfortable and enjoyable as possible.',
  image: 'https://via.placeholder.com/600x400.png?text=About+Us',
};

export const restaurantData = {
  title: 'Our Restaurant',
  description: 'Enjoy a delicious meal at our world-class restaurant. We offer a wide variety of cuisines to suit every taste.',
  menu: [
    {
      id: 1,
      name: 'Steak',
      price: 25,
    },
    {
      id: 2,
      name: 'Salmon',
      price: 20,
    },
    {
      id: 3,
      name: 'Pasta',
      price: 15,
    },
  ],
  image: 'https://via.placeholder.com/600x400.png?text=Restaurant',
};

export const facilitiesData = {
  title: 'Our Facilities',
  facilities: [
    {
      id: 1,
      name: 'Gym',
      description: 'Stay fit and healthy at our state-of-the-art gym.',
      image: 'https://via.placeholder.com/400x300.png?text=Gym',
    },
    {
      id: 2,
      name: 'Spa',
      description: 'Relax and rejuvenate at our luxurious spa.',
      image: 'https://via.placeholder.com/400x300.png?text=Spa',
    },
    {
      id: 3,
      name: 'Conference Hall',
      description: 'Host your next event at our spacious conference hall.',
      image: 'https://via.placeholder.com/400x300.png?text=Conference+Hall',
    },
  ],
};

export const contactData = {
  title: 'Contact Us',
  address: '123 Main Street, Anytown, USA',
  phone: '555-555-5555',
  email: 'info@hotel.com',
};
