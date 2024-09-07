// src/components/NotFound.js
import React from 'react';
import Notfound from '@/assets/404.png';
import ErrorPage from './error';

const NotFound = () => {
    return (
        <ErrorPage
            imageSrc={Notfound}
            title="Error 404"
            message="There is Nothing here"
            linkText="Go Home"
            linkTo="/"
        />
    );
};

export default NotFound;
