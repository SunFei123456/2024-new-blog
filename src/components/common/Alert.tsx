import React, { useEffect } from 'react';
import { AlertCircle, AlertTriangle, Check, X } from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';

const Alert = ({ type, message, onClose }) => {
    const alertTypes = {
        success: {
            className: 'alert-success',
            icon: <Check />,
        },
        error: {
            className: 'alert-error',
            icon: <AlertTriangle />,
        },
        warning: {
            className: 'alert-warning',
            icon: <AlertCircle />,
        },
    };

    const { className, icon } = alertTypes[type] || alertTypes.warning;

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 1500); 
        return () => clearTimeout(timer); // Cleanup
    }, [onClose]);

    return (
        <div className='fixed top-20 z-[999] left-1/2 -translate-x-1/2 w-full max-w-[80%] lg:max-w-[400px]'>
            <AnimatePresence> {/* Add AnimatePresence here */}
                <motion.div
                    role="alert"
                    className={`alert ${className} text-white flex **:flex-row justify-between w-full h-auto p-4`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }} // Ensure it's visible at first
                    exit={{ opacity: 0, y: -20 }} // Move up and fade out
                    transition={{ duration: 0.25 }}
                >
                    <div className="flex items-center">
                        {icon}
                        <span className="flex-1 ml-2">{message}</span>
                    </div>
                    <X onClick={onClose} className='cursor-pointer' />
                </motion.div>
            </AnimatePresence> {/* Wrap the motion div with AnimatePresence */}
        </div>
    );
};

export default Alert;
