import { useContext } from 'react';
import { AuthContext } from '../context/authContext'; // <-- Update this import path

export const useAuth = () => {
  return useContext(AuthContext);
};