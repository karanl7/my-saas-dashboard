// Custom hook to easily use the auth context
import {useContext} from 'react'
import AuthContext from './AuthContext'
export const useAuth = () => {
  return useContext(AuthContext);
};