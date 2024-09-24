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
import { convertISOToLocalDateTime, formatDate } from '@/tools';
import { getWallpaper } from '@/apis/wallpaper';


export default function ArticleList() {
    const navigate = useNavigate()
    const [wallpaperData, setWallpaperData] = useState<any>({});
    const [isImageLoaded, setIsImageLoaded] = useState(false);
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

    const getBingPic = async () => {
        try {
            const res: any = await getWallpaper();
            if (res.data.code === 200) {
                setWallpaperData(res.data.data);
                const img = new Image();
                img.src = res.data.data.imageUrl; // 设置图片源
                img.onload = () => setIsImageLoaded(true); // 图片加载完成时更新状态
                img.onerror = () => {
                    // 图片加载失败，使用默认壁纸
                    setWallpaperData({
                        imageUrl: "http://127.0.0.1:8080/static/image/comment_default_bg.jpg",
                        title: "默认标题",
                        copyright: "默认版权",
                    });
                    setIsImageLoaded(true); // 设置为已加载状态
                };
            } else {
                throw new Error("获取图片失败");
            }
        } catch (error) {
            console.error("获取 Bing 图片出错:", error);
            // 使用默认壁纸
            setWallpaperData({
                imageUrl: "http://127.0.0.1:8080/static/image/comment_default_bg.jpg",
                title: "默认标题",
                copyright: "默认版权",
            });
            setIsImageLoaded(true); // 设置为已加载状态
        }
    };

    useEffect(() => {
        getBingPic();
    }, []);


    return (
        <div className="w-full p-6 lg:p-24 lg:pt-4">
            {/* 顶部封面图 */}
            {isImageLoaded ? (
                <img
                    src={wallpaperData.imageUrl}
                    alt={wallpaperData.title}
                    className="w-full h-40 lg:h-96 object-cover mb-8 lg:mb-12"
                />
            ) : (
                <div
                    className="w-full h-40 lg:h-96 bg-gray-300 animate-pulse rounded-md mb-8 lg:mb-12"
                ></div>
            )}
            {/* 标题和排序选项 */}
            <div className='flex flex-col lg:flex-row justify-between items-center lg:items-start mb-6'>
                <h1 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-0">文章列表</h1>
            </div>

            {/* 文章列表 */}
            <div className="space-y-6">
                {articleList.map((article) => (
                    <div key={article.id} className="flex  lg:flex-row  shadow rounded-md mb-4 cursor-pointer"
                        onClick={() => navigate(`/article/${article.id}`)}
                    >
                        {/* 文章封面图 */}
                        <img src={article.coverImage} alt={article.title} className="w-32 h-auto lg:w-80 lg:h-40 object-cover rounded-md" />

                        {/* 文章内容 */}
                        <div className="flex-1 flex flex-col justify-between items-start  lg:items-start  py-2 px-4">
                            <div>
                                <h2 className="text-sm lg:text-xl font-semibold mb-2">{article.title}</h2>
                                <p className="text-xs lg:text-base text-gray-600 mb-2">{article.content.replace(/[`#*]+/g, '').slice(0, 100)}...</p>
                            </div>
                            {/* 用户信息和标签 */}
                            <div className="w-full flex justify-between lg:flex-row lg:items-center text-gray-500  lg:space-y-0 lg:space-x-4 mb-2">
                                <div className='flex items-center space-x-1'>
                                    <User size={13} />
                                    <span className='text-xs lg:text-sm'>{article.user.nickname}</span>
                                </div>
                                <div className='flex items-center space-x-1'>
                                    <Calendar size={13} />
                                    <span className='text-xs lg:text-sm'>{formatDate(convertISOToLocalDateTime(article.created_at, "Asia/Shanghai"))}</span>

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
