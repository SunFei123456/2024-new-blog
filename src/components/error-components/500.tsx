// src/components/ServiceError.js
import React from 'react';
import Service_Error from '@/assets/500.gif';
import ErrorPage from './error';

const ServiceError = () => {
    return (
        <ErrorPage
            imageSrc={Service_Error}
            title="Error 500"
            message="Service is Unavailable"
            linkText="Go Home"
            linkTo="/"
        />
    );
};

export default ServiceError;
