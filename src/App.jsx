import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} /> {/* Osnovna stran */}
            <Route path="/login" element={<Login />} /> {/* Stran za prijavo */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
