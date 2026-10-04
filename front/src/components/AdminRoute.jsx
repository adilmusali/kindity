import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <p role="status" className="text-center py-40">Loading session...</p>;

  if (user && user.role === 'admin') {
    return children;
  }

  return <Navigate to="/" replace />;
};

export default AdminRoute;
