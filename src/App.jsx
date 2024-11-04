import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content">
          <div className="content-area">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} /> {/* Edina dostopna stran */}
              <Route path="/" element={<Navigate to="/dashboard" />} /> {/* Privzeta preusmeritev na Dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" />} /> {/* Preusmeritev za neznane poti */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
