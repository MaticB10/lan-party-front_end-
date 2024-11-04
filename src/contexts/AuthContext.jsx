import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token) {
      console.log('Token found in local storage:', token);
    } else {
      console.log('No token found in local storage');
    }

    if (userData && userData !== 'undefined') {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        console.log('User data parsed successfully:', parsedUser);
      } catch (error) {
        console.error('Failed to parse user data from local storage:', error);
        localStorage.removeItem('user'); // Clear invalid user data from local storage
      }
    } else {
      console.log('No user data found in local storage');
    }
  }, []);

  const login = (data) => {
    console.log('Logging in with data:', data);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
