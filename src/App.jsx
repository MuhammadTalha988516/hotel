import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './utils/Navbar';
import Footer from './utils/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import Facilities from './pages/Facilities';
import Restaurant from './pages/Restaurant';
import ContactUs from './pages/ContactUs';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import HotelLogin from './pages/HotelLogin';
import HotelSignup from './pages/HotelSignup';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
  <AuthProvider>
    <Router>
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/restaurant" element={<Restaurant />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/hotel/login" element={<HotelLogin />} />
          <Route path="/hotel/signup" element={<HotelSignup />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      <Footer />
    </Router>
  </AuthProvider>
  );
}

export default App;
