import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RestrictedRoute = ({ children, redirectTo = '/' }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  return isLoggedIn ? <Navigate to={redirectTo} /> : children;
};