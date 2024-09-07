// src/components/ErrorPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'react-feather';

const ErrorPage = ({ imageSrc, title, message, linkText, linkTo }) => {
    return (
        <div className='flex flex-col sm:flex-row items-center justify-center h-full p-4'>
            {/* Left: Error image */}
            <img className='w-full sm:w-1/4 md:w-1/3 object-cover object-center mb-4 sm:mb-0' src={imageSrc} alt="Error" />

            {/* Right: text and introduction */}
            <div className='flex flex-col items-center sm:items-start text-center sm:text-left gap-3'>
                <span className='text-xl font-semibold'>{title}</span>
                <div className="divider divider-primary mb-3">Primary</div>
                <span className='text-2xl md:text-3xl font-bold'>{message}</span>
                <span className='text-sm md:text-base'>But the page is missing or you assembled the link incorrectly.</span>

                <Link to={linkTo} className='flex items-center mt-4'>
                    <span>
                        {linkText}
                    </span>
                    <ArrowRight className='ml-2' size={20} />
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;