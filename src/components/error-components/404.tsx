// src/components/NotFound.js
import React from 'react';
import Notfound from '@/assets/404.png';
import ErrorPage from './error';

const NotFound = () => {
    return (
        <ErrorPage
            imageSrc={Notfound}
            title="Error 404"
            message="这里什么也没有"
            desc="抱歉，您访问的页面不存在"
            linkText="返回首页"
            linkTo="/"
        />
    );
};

export default NotFound;
