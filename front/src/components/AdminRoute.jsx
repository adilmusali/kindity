import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const AdminRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  if (user && user.role === 'admin') {
    return children;
  }

  return <Navigate to="/" />;
};

export default AdminRoute;