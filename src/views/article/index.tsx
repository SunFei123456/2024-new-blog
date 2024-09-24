import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';

import Codeer from '@/assets/Group.png';
import recently_svg from '@/assets/recently.svg';
import js_svg from '@/assets/javascript-original.svg';
import vue_svg from '@/assets/vue-original.svg';
import react_svg from '@/assets/react-original.svg';
import go_svg from '@/assets/go-original.svg';
import avatar from '@/assets/avatar.jpg'

import ArticleSection from '@/components/article/ArticleSection';
import Loading from '@/components/common/Loading';

import { getArticlesByCategoryApi, getArticleStatsApi, getRecentArticlesApi } from '@/apis';
import ErrorPage from '@/components/error-components/500';
import { ResponseType, ArticleStatisticsType } from '@/type';

export default function Article() {
    const navigate = useNavigate();
    const [articleStats, setArticleStats] = useState<ArticleStatisticsType>({
        article_total: 0,
        views_total: 0,
        category_total: 0,
    });
    const fetchAllArticles = async () => {
        const [recentlyArticles, jsArticles, vueArticles, reactArticles, goArticles] = await Promise.allSettled([
            getRecentArticlesApi(),
            getArticlesByCategoryApi('JavaScript'),
            getArticlesByCategoryApi('Vue'),
            getArticlesByCategoryApi('React'),
            getArticlesByCategoryApi('go'),
        ]);

        let hasError = false;

        return {
            recentlyArticles: recentlyArticles.status === 'fulfilled' ? recentlyArticles.value.data.data : [],
            jsArticles: jsArticles.status === 'fulfilled' ? jsArticles.value.data.data : [],
            vueArticles: vueArticles.status === 'fulfilled' ? vueArticles.value.data.data : [],
            reactArticles: reactArticles.status === 'fulfilled' ? reactArticles.value.data.data : [],
            goArticles: goArticles.status === 'fulfilled' ? goArticles.value.data.data : [],
            // 检查是否有任何请求被拒绝
            hasError: hasError || recentlyArticles.status === 'rejected' || jsArticles.status === 'rejected' || vueArticles.status === 'rejected' || reactArticles.status === 'rejected' || goArticles.status === 'rejected',
        };
    };


    // 使用 useRequest 处理请求
    const { data, loading, error } = useRequest(fetchAllArticles);

    // 获取文章浏览总量
    const { data: stats, loading: statsLoading, error: statsError } = useRequest(getArticleStatsApi);



    // 使用 useEffect 更新 articleStats
    useEffect(() => {
        if (stats?.data?.code === 200) {
            setArticleStats(stats.data.data);
        }
    }, [stats]); // 依赖 stats

    // 加载或错误处理
    if (loading || statsLoading) return <Loading />;
    if (data.hasError || statsError) return <div><ErrorPage /></div>;

    const viewMoreHandler = (path) => {
        navigate(`/article/${path}/list`);
    };

    return (
        <div className='w-full h-full space-y-12 p-4'>
            {/* 上方 */}
            <div className='w-full flex flex-col lg:flex-row justify-between gap-x-11 p-6'>
                {/* 左 */}
                <div className='flex flex-col space-y-4 lg:flex-row w-full lg:w-full  items-center  p-3'>
                    <div className='h-full flex flex-col items-center lg:items-start w-full lg:w-[40%]'>
                        {/* 头像和个人资料 */}
                        <div className="avatar">
                            <div className="ring-primary ring-offset-base-100 w-24 lg:w-32 h-24 lg:h-32 rounded-full ring ring-offset-2">
                                <img src={avatar} />
                            </div>
                        </div>
                        <div className='flex flex-col items-center lg:items-start gap-2 mt-4'>
                            <span className='text-sm lg:text-xl font-bold'>孙飞</span>
                            <span className='text-sm'>@2770894499</span>
                            <span className='text-sm'>全栈工程师</span>
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
                    <div className='w-full h-auto flex flex-col justify-between gap-4  lg:w-[50%] '>
                        {/* 第一个卡片独占一行 */}
                        <div className="w-full h-1/2 stats shadow">
                            <div className="stat">
                                <div className="stat-figure text-secondary">
                                    <div className="btn btn-circle bg-primary">
                                        <span>{data.recentlyArticles.length}</span>
                                    </div>
                                </div>
                                <div className="stat-title">发表文章 </div>
                                <div className="stat-value text-xl lg:text-2xl">{articleStats.article_total}</div>
                                <div className="stat-desc">比上月多 21%</div>
                            </div>
                        </div>

                        {/* 后两个卡片并排显示 */}
                        <div className="w-full  h-1/2 flex flex-col lg:flex-row gap-4">
                            <div className="w-full lg:w-[50%] stats shadow">
                                <div className="stat">
                                    <div className="stat-title">文章类型</div>
                                    <div className="stat-value text-xl lg:text-2xl">{articleStats.category_total}</div>
                                    <div className="stat-desc">比上月多 21%</div>
                                </div>
                            </div>
                            <div className="w-full lg:w-[50%] stats shadow">
                                <div className="stat">
                                    <div className="stat-title">总浏览数</div>
                                    <div className="stat-value text-xl lg:text-2xl">{articleStats.views_total}</div>
                                    <div className="stat-desc">比上月多 21%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                {/* 右 */}
                <img src={Codeer} alt="" className='w-full hidden lg:w-96 lg:block object-cover mt-6 lg:mt-0' />
            </div>


            {/* 下方内容 */}
            <div className='w-full flex flex-col lg:flex-row flex-wrap gap-6 p-6'>
                <ArticleSection
                    title="最近文章"
                    icon={recently_svg}
                    articles={data.recentlyArticles}
                    viewMore={() => viewMoreHandler("Recently")}
                />
                <ArticleSection
                    title="JS模块"
                    icon={js_svg}
                    articles={data.jsArticles}
                    viewMore={() => viewMoreHandler("JavaScript")}
                />
                <ArticleSection
                    title="Vue模块"
                    icon={vue_svg}
                    articles={data.vueArticles}
                    viewMore={() => viewMoreHandler("Vue")}
                />
                <ArticleSection
                    title="React模块"
                    icon={react_svg}
                    articles={data.reactArticles}
                    viewMore={() => viewMoreHandler("React")}
                />
                <ArticleSection
                    title="Go模块"
                    icon={go_svg}
                    articles={data.goArticles}
                    viewMore={() => viewMoreHandler("Go")}
                />
            </div>

        </div>
    );
}
