import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './utils/Navbar';
import Footer from './utils/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import Facilities from './pages/Facilities';
import ContactUs from './pages/ContactUs';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="pt-16 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected Dashboard Route */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            
            {/* Redirect any unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
