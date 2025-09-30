import React, { useContext } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    const location = useLocation();

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />
    }

    return children;
}

export default ProtectedRoute;