import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './utils/Navbar';
import Footer from './utils/Footer';
import Home from './pages/Home';
import About from './about/About';
import Rooms from './rooms/Rooms';
import Facilities from './facilities/Facilities';
import Restaurant from './restaurant/Restaurant';
// import ContactUs from './contact/ContactUs';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/restaurant" element={<Restaurant />} />
          {/* <Route path="/contact" element={<ContactUs />} /> */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
