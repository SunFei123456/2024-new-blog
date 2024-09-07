/*
 * @Author: 孙飞
 * @Date: 2024-08-18 20:27:24
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-06 22:55:23
 * @Description: 主框架页面 layout 二级路由出口
 */


import React,{ useEffect, useState } from 'react';
import { Outlet,Link } from 'react-router-dom';

const Layout = ({ themeList }) => {
    /**
     * Switch the theme and persist it to local storage.
     * @param theme {string} The theme name.
     */
    const changeTheme = (theme: string) => {
        // Set the theme name in local storage.
        localStorage.setItem("theme", theme);
        // Set the theme name in the document element.
        document.documentElement.setAttribute("data-theme", theme);
    };
    return (
        <div className='w-full h-screen flex flex-col'>
            {/* header */}
            <header className='shadow-sm glass fixed top-0 left-0 right-0 z-10 bg-cyan-300'>
                <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">孙飞个人工作空间</a>
                    </div>
                    <div className="flex-none dropdown dropdown-end">
                        <ul className="menu menu-horizontal px-1">
                            <li><Link to="/">首页</Link></li>
                            <li><Link to="/friends">朋友圈</Link></li>
                            <li><Link to="/poem">我的诗</Link></li>
                            <li><Link to="/hotNews">每日热点</Link></li>
                            <li><Link to="/website">宝藏网站收录</Link></li>
                            <li><Link to="/article">我的文章</Link></li>
                            <li><Link to="/guestbook">留言板</Link></li>
                            <li><Link to="/process">项目进度</Link></li>
                            <li>
                                <details>
                                    <summary>主题选择器</summary>
                                    <ul className="space-y-2 dropdown-content flex flex-col bg-base-200 w-48 rounded-t-none p-4 h-96 overflow-auto">
                                        {themeList.map((item: { id: React.Key; color: string; value: string; textColor: string; name: React.ReactNode }) => (
                                            <li key={item.id} className="w-full">
                                                <button
                                                    data-set-theme={item.value}
                                                    style={{ backgroundColor: item.color }}
                                                    className="w-full h-10 rounded-md text-center"
                                                    onClick={() =>changeTheme(item.value)}
                                                >
                                                    <span style={{ color: item.textColor }}>{item.name}</span>
                                                </button>
                                            </li>
                                        ))}
                                    </ul> 
                                </details>

                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            {/* content */}
            <main className='flex-1 mt-[4rem] px-20 py-10'>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
