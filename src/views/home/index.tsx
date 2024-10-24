// src/components/Home.js
import React from 'react';
import '@/styles/style.css'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='w-full h-[80vh] flex items-center justify-center flex-col-center gap-6 '>
            <div className='text-xl lg:text-5xl font-bold text-primary'>欢迎来到我的个人空间</div>
            <span>生活记录 学习记录 极简主义 实用主义</span>

            <Link to="/article"><button className='btn btn-primary text-white w-32 lg:w-auto'>开始 </button></Link>

        </div>
    );
};



export default Home;
