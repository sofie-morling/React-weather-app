import React from 'react';
import { useLocation } from 'react-router-dom';

export const NotFound = () => {
    const location = useLocation();
    return (
        <h2>{location.pathname} Not Found...</h2>
    )
};

export default NotFound;
