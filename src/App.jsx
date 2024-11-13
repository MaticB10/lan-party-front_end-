import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Team from './components/Team';
import Sponsors from './components/Sponsors';
import Blog from './components/Blog';
import About from './components/About';
import Footer from './components/Footer';
import ProtectedRoute from './contexts/ProtectedRoute'; // Import the ProtectedRoute component
import './styles/App.css';

function App() {
  const location = useLocation();
  const { user } = useAuth();

  // Determine the overlay class based on the current route
  const overlayClass =
    location.pathname === '/' ? 'home-overlay' :
    location.pathname === '/login' ? 'login-overlay' :
    location.pathname === '/register' ? 'register-overlay' :
    location.pathname === '/team' ? 'team-overlay' :
    location.pathname === '/sponsors' ? 'sponsors-overlay' :
    location.pathname === '/blog' ? 'blog-overlay' :
    location.pathname === '/about' ? 'about-overlay' :
    '';

  return (
    <div className="app">
      <Header />
      <div className={`gradient-overlay ${overlayClass}`}></div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route path="/team" element={<Team />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  );
}
