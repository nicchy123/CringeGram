import React, { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user,loading } = useContext(AuthContext);

    if (user) {
        return children
    }

    return <Navigate to="/signin" state={{ from: location }} replace />
};

export default PrivateRoute;