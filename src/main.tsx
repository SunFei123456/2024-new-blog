
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'; // Import RouterProvider
import router from './router/index'; // Import your router
import React from 'react';
// 引入tailwindcss
import './styles/tailwind.css'
// 引入主题切换
import { themeChange } from 'theme-change';


themeChange(false);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} /> 
);
