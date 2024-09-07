// src/components/Home.js
import React from 'react';
import '@/styles/style.css'

const Home = () => {
    console.log('Hello, World!');

    return (
        <>
        <div className='w-full h-full flex-col-center gap-6 '>
            <div className='text-5xl font-bold'>这是我的个人工作空间</div>
            <span>极简主义 实用主义</span>
            <button className='btn btn-primary'>开始</button>
        </div>

        </>

    );
};



export default Home;
