// src/components/Home.js
import React from 'react';
import '@/styles/style.css'
import { Link } from 'react-router-dom';

const Home = () => {
    console.log('Hello, World!');

    return (
        <div className='w-full h-[80vh] flex items-center justify-center flex-col-center gap-6 '>
            <div className='text-xl lg:text-5xl font-bold'>这是我的个人工作空间</div>
            <span>极简主义 实用主义</span>

            <Link to="/article"><button className='btn btn-primary w-32 lg:w-auto'>开始 </button></Link>

        </div>
    );
};



export default Home;
