import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { token, isLoading } = useContext(AuthContext);
    const ToeknLocal = localStorage.getItem('token');

    if (isLoading) {
        return <div>Chargement...</div>;
    }

    if (!token && !ToeknLocal) {
        return <Navigate to="/login" />;
    }

    // Render les enfants ou l'Outlet si des enfants ne sont pas fournis
    return <Outlet />;
};

export default PrivateRoute;
