// This file ONLY defines and exports the Provider component.
import { useState } from 'react';
import { AuthContext } from './authContext'; // <-- Import the context from the new file

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('authToken');
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};