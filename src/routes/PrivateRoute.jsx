import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
      const { user, loading } = useAuth();
        const location = useLocation()
        if (loading) {
            return <h2>loading</h2>
        }
        if (!user) {
            return <Navigate state={{from: location.pathname}} to='/signing'></Navigate>
        }
    return children
};

export default PrivateRoute;