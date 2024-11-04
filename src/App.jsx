import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Pregled from './components/Pregled';
import VnosOpreme from './components/VnosOpreme';
import PregledOpreme from './components/PregledOpreme';
import ChangePassword from './components/ChangePassword';
import PregledGasilca from './components/PregledGasilca';
import Aktivnosti from './components/Aktivnosti';
import LoginPage from './pages/LoginPage';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import './styles/App.css';

function App() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(`Authentication status changed: ${user ? 'authenticated' : 'unauthenticated'}`);
  }, [user]);

  const handleLoginSuccess = (data) => {
    console.log("Login successful:", data);
  };

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          {user ? (
            <>
              <Sidebar />
              <div className="main-content">
                <Header />
                <div className="content-area">
                  <Routes>
                    <Route path="/pregled" element={<Pregled />} />
                    <Route
                      path="/vnos-opreme"
                      element={<ProtectedRoute element={VnosOpreme} allowedRoles={['Admin', 'Super Admin']} />}
                    />
                    <Route path="/pregled-opreme" element={<PregledOpreme />} />
                    <Route path="/geslo-za-dostop" element={<ChangePassword />} />
                    <Route path="/pregled-gasilca" element={<PregledGasilca pgdId={user.pgdId} />} />
                    <Route path="/aktivnosti" element={<Aktivnosti />} />
                    <Route path="/" element={<MainContent />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </div>
              </div>
            </>
          ) : (
            <Routes>
              <Route path="/login" element={<LoginPage loginSucess={handleLoginSuccess} />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
