import React, { useContext } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);
    const location = useLocation();

    if (loading) return <p role="status" className="text-center py-40">Loading session...</p>;

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children;
}

export default ProtectedRoute;
