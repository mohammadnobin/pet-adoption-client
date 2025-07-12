import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingSpinner from '../components/Shared/Loading/LoadingSpinner';

const PrivateRoute = ({children}) => {
      const { user, loading } = useAuth();
        const location = useLocation()
        if (loading) {
            return <LoadingSpinner />
        }
        if (!user) {
            return <Navigate state={{from: location.pathname}} to='/signin'></Navigate>
        }
    return children
};

export default PrivateRoute;