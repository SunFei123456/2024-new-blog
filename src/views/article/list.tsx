/*
 * @Author: 孙飞
 * @Date: 2024-08-24 21:52:52
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-04 18:10:42
 * @Description: 做好每一件小事~
 */
import React from 'react';
import { Calendar, User, Tag } from 'react-feather';

import { getArticlesListByCategoryApi } from '@/apis'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'

import { ArticleType } from '@/type'
import { convertISOToLocalDateTime } from '@/tools';


export default function ArticleList() {
    const navigate = useNavigate()
    // 定义文章列表的状态 + 类型


    const [articleList, setArticleList] = useState<ArticleType[]>([]);
    // 获取url path 参数的值
    const params = useParams();
    const { category } = params

    const getArticleList = async (category: string) => {
        const res = await getArticlesListByCategoryApi(category)
        setArticleList(res.data.data)
    }

    useEffect(() => {
        getArticleList(category)
    }, [])

    
    return (
        <div className="w-full p-6 lg:p-24 lg:pt-4">
            {/* 顶部封面图 */}
            <img src="https://via.placeholder.com/150" className='hidden lg:block w-full h-40 lg:h-96 object-cover mb-8 lg:mb-12' alt="" />

            {/* 标题和排序选项 */}
            <div className='flex flex-col lg:flex-row justify-between items-center lg:items-start mb-6'>
                <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-0">文章列表</h1>
            </div>

            {/* 文章列表 */}
            <div className="space-y-6">
                {articleList.map((article) => (
                    <div key={article.id} className="flex flex-col lg:flex-row gap-4 shadow  rounded-md  mb-4 cursor-pointer"
                        onClick={() => navigate(`/article/${article.id}`)}
                    >
                        {/* 文章封面图 */}
                        <img src={article.coverImage} alt={article.title} className=" w-full border lg:w-40 h-46 object-cover rounded-md" />

                        {/* 文章内容 */}
                        <div className="flex-1 flex flex-col lg:items-start items-center py-2 px-4">
                            <h2 className=" text-lg lg:text-xl font-semibold mb-2">{article.title}</h2>
                            <p className="text-gray-600 mb-2">{article.content.replace(/[`#*]+/g, '').slice(0, 100)}</p>

                            {/* 用户信息和标签 */}
                            <div className="flex flex-col items-center lg:flex-row lg:items-center text-gray-500 text-sm space-y-2 lg:space-y-0 lg:space-x-4 mb-2">
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span>{article.user.nickname}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{convertISOToLocalDateTime(article.created_at, "Asia/Shanghai")}</span>
                                </div>
                                <div className='flex flex-wrap gap-2'>
                                    <span className=' bg-purple-500 lg:bg-gray-300 text-white px-2 py-1 rounded'>{article.tags}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 更多文章按钮 */}
            <div className="text-center mt-6">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
                    查看更多
                </button>
            </div>
        </div>

    );
}
