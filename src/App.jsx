import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Footer from './components/Footer';
import Team from './components/Team';
import Sponsors from './components/sponsors';
import Blog from './components/Blog';
import About from './components/About';
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
            <Route path="/team" element={<Team />} /> {/* Stran za prijavo */}
            <Route path="/sponsors" element={<Sponsors />} /> {/* Stran za prijavo */}
            <Route path="/blog" element={<Blog />} /> {/* Stran za prijavo */}
            <Route path="/about" element={<About />} /> {/* Stran za prijavo */}

          
          
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
