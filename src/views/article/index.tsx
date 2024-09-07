import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import Codeer from '@/assets/Group.png'
import Zhanwei from '@/assets/000007lbN3I.jpg'

import react_svg from '@/assets/react-original.svg'
import vue_svg from '@/assets/vue-original.svg'
import js_svg from '@/assets/javascript-original.svg'
import recently_svg from '@/assets/recently.svg'
import go_svg from '@/assets/go-original.svg'
import ArticleSection from '@/components/article/ArticleSection';

import { getArticlesByCategoryApi, getRecentArticlesApi } from '@/apis'

import { Code, Award, ArrowRight } from 'react-feather'
import { useEffect } from 'react';

export default function Article() {
    // 准备 "最近文章" 的 data
    const [recentlyArticles, setRecentlyArticles] = useState([]);
    // 准备"js" 的文章的data
    const [jsArticles, setJsArticles] = useState([]);
    // 准备 "vue"的文章的data
    const [vueArticles, setVueArticles] = useState([]);
    // 准备 "react"的文章的data
    const [reactArticles, setReactArticles] = useState([]);
    // 准备 "go" 的文章的data
    const [goArticles, setGoArticles] = useState([]);

    const getRecentlyArticles = async () => {
        const res = await getRecentArticlesApi();
        setRecentlyArticles(res.data);
        // console.log("api:",recentlyArticles);
    }

    const getVueArticles = async () => {
        const res = await getArticlesByCategoryApi('Vue');
        setVueArticles(res.data);
        // console.log("api:",vueArticles);
    }

    const getReactArticles = async () => {
        const res = await getArticlesByCategoryApi('React');
        setReactArticles(res.data);
        // console.log("api:",reactArticles);
    }

    const getGoArticles = async () => {
        const res = await getArticlesByCategoryApi('Go');
        setGoArticles(res.data);
        // console.log("api:",goArticles);
    }
    const getJsArticles = async () => {
        const res = await getArticlesByCategoryApi('JavaScript');
        setJsArticles(res.data);
        // console.log("api:",jsArticles);
    }
    useEffect(() => {
        getRecentlyArticles();
        getVueArticles();
        getReactArticles()
        getGoArticles()
        getJsArticles()
    }, [])

    const navigate = useNavigate();

    const viewMoreHandler = (path: string) => {
        // 路由跳转
        console.log('查看更多', path);
        navigate(`/article/${path}/list`);
    }
    return (

        <div className='w-full h-full space-y-12 p-4'>
            {/* 上方 */}
            <div className='w-full flex justify-between p-6'>
                {/* 左边个人资料 + 数据流量展示卡片 */}
                <div className='flex w-3/5 items-center justify-between p-3'>
                    <div className='flex  flex-col w-[50%]'>
                        {/* 头像 */}
                        <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-32 h-32 rounded-full ring ring-offset-2">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        {/* 个人资料 */}
                        <div className='flex flex-col items-start gap-2 mt-4'>
                            <span className='text-xl font-bold'>孙飞</span>
                            <span className='text-sm'>@2770894499</span>
                            {/* 职业 */}
                            <span className='text-sm'>全栈工程师</span>
                            {/* 技术栈 */}
                            <div className='flex gap-2'>
                                <img src="https://img.shields.io/badge/-Go-333333?style=flat&logo=go&logoColor=276DC3" alt="" />
                                <img src="https://img.shields.io/badge/-React-333333?style=flat&logo=react" alt="" />
                                <img src="https://img.shields.io/badge/-Vue-333333?style=flat&logo=Vue" alt="" />
                                <img src="https://img.shields.io/badge/-MySQL-333333?style=flat&logo=mysql" alt="" />
                                <img src="https://img.shields.io/badge/-Node.js-333333?style=flat&logo=node.js" alt="" />
                            </div>

                        </div>
                    </div>
                    {/* 数据流量展示 */}
                    <div className='w-[50%] h-full  flex gap-3 flex-wrap'>
                        <div className="w-full stats shadow">
                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <div className="btn btn-circle bg-primary">
                                        <Award size={32} color='#fff'></Award>
                                    </div>
                                </div>
                                <div className="stat-title">发表文章</div>
                                <div className="stat-value">89</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>
                        </div>
                        <div className="stats shadow">
                            <div className="stat">
                                <div className="stat-title">文章类型</div>
                                <div className="stat-value">10</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>
                        </div>
                        <div className="stats shadow">
                            <div className="stat">
                                <div className="stat-title">总浏览数</div>
                                <div className="stat-value">89,400</div>
                                <div className="stat-desc">21% more than last month</div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 右边图片 */}
                <img src={Codeer} alt="" className='w-96 object-cover' />
            </div>


            {/* 下方内容 */}

            {/* 最近文章 */}
            <div className='w-full flex flex-col gap-16 p-6'>
                <ArticleSection
                    title="最近文章"
                    icon={recently_svg}
                    articles={recentlyArticles}
                    viewMore={() => viewMoreHandler("Recently")}
                />
                {/* 关于js的文章 */}
                <ArticleSection
                    title="JS模块"
                    icon={js_svg}
                    articles={jsArticles}
                    viewMore={() => viewMoreHandler("JavaScript")}

                />

                {/* 关于Vue的文章 */}
                <ArticleSection
                    title="Vue模块"
                    icon={vue_svg}
                    articles={vueArticles}
                    viewMore={() => viewMoreHandler("Vue")}
                />

                {/* 关于React的文章 */}
                <ArticleSection
                    title="React模块"
                    icon={react_svg}
                    articles={reactArticles}
                    viewMore={() => viewMoreHandler("React")}
                />
                {/* 关于go的文章 */}
                <ArticleSection
                    title="Go模块"
                    icon={go_svg}
                    articles={goArticles}
                    viewMore={() => viewMoreHandler("Go")}
                />

            </div>

        </div>
    )
}
