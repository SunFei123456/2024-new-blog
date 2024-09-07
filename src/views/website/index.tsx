/*
 * @Author: 孙飞
 * @Date: 2024-09-04 17:16:32
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-05 21:59:41
 * @Description: 该页面是用来展示收藏的宝藏网站
 */
import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
export default function Website() {
    
    return (
        <>
            <div className='w-full flex items-center justify-center'>
                <ul className=" bg-base-200  p-4 mt-4 menu space-x-3  lg:menu-horizontal rounded-box">
                    <li className=' rounded-md'>
                        <Link to="/website/ui/plane">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            UI设计
                            <span className="badge badge-sm">9+</span>
                        </Link>
                    </li>
                    <li className='rounded-md'>
                        <Link to="/website/frontend/plane">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            前端开发
                            <span className="badge badge-sm">19+</span>

                            <span className="badge badge-sm badge-warning">NEW</span>
                        </Link>
                    </li>
                    <li className='rounded-md'>
                        <Link to="/website/resource/plane">
                            素材资源
                            <span className="badge badge-xs badge-info"></span>
                        </Link>
                    </li>
                    <li className='rounded-md'>
                        <Link to="/website/ai/plane">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            AI工具
                            <span className="badge badge-sm">19+</span>

                            <span className="text-white badge badge-sm  badge-success">NB</span>
                        </Link>
                    </li>
                </ul>
            </div>
            {/* 二级路由 */}
            <Outlet />
        </>
    )
}

