import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { token, isLoading } = useContext(AuthContext);

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    // Redirection si non authentifié
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Render les enfants ou l'Outlet si des enfants ne sont pas fournis
    return children ? children : <Outlet />;
};

export default PrivateRoute;
