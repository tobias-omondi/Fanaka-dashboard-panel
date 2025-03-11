import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAdmin = localStorage.getItem('isAdmin'); // Adjust this based on your auth logic
    return isAdmin ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute; // Ensure it's a default export
