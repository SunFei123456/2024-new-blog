// src/components/ServiceError.js
import React from 'react';
import Service_Error from '@/assets/500error.svg';
import ErrorPage from './error';

const ServiceError = () => {
    return (
        <ErrorPage
            imageSrc={Service_Error}
            title="Error 500"
            message="服务器错误"
            desc="抱歉, 服务器出错了, 请稍后再试。"
            linkText="返回首页"
            linkTo="/"
        />
    );
};

export default ServiceError;
