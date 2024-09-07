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
import { useEffect ,useState} from 'react';
import { useParams } from 'react-router-dom'

import { ArticleType} from '@/type'


export default function ArticleList() {
    // 定义文章列表的状态 + 类型


    const [articleList, setArticleList] = useState<ArticleType[]>([]);
    // 获取url path 参数的值
    const params = useParams();
    const { category } = params

    const getArticleList = async (category: string) => {
        console.log(category);

        const res = await getArticlesListByCategoryApi(category)
        setArticleList(res.data)
    }

    useEffect(() => {
        getArticleList(category)
    },[])
    return (
        <div className="w-full p-24 pt-12">
            <img src="https://via.placeholder.com/150" className='w-full h-64 object-cover mb-12' alt="" />
            <div className='flex justify-between'>
                <h1 className="text-3xl font-bold mb-6">文章列表</h1>
                <div className='flex gap-4'>
                    {/* 最新 */}
                    <h2 className="text-xl font-bold mb-2">最新</h2>
                    <h2 className="text-xl font-bold mb-2">最热</h2>
                </div>
            </div>

            <div className="space-y-6">
                {articleList.map((article) => (
                    <div key={article.id} className="flex gap-4 border-b border-gray-300 pb-4 mb-4">
                        <img src={article.coverImage} alt={article.title} className="w-40 h-32 object-cover rounded-md" />
                        <div className="flex-1">
                            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                            <p className="text-gray-600 mb-2">{article.content.slice(0, 100)}</p>
                            <div className="flex items-center text-gray-500 text-sm space-x-4 mb-2">
                                <div className="flex items-center gap-2">
                                    <User size={16} />
                                    <span>{article.user.nickname}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    <span>{article.created_at}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag size={16} />
                                    <span>{article.tags}</span>
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
