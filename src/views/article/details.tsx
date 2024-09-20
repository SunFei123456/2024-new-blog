import React, { useEffect, useState } from 'react';
import { Calendar, User, Tag, Clock,Eye } from 'react-feather';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleByIdApi, getArticleCommentListApi, getHotArticlesApi,increaseArticleViewsApi } from '@/apis/article';
import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { useRequest } from 'ahooks';
import Loading from '@/components/common/Loading';
import { ResponseType, ArticleType } from '@/type'
import { convertISOToLocalDateTime, formatDate } from '@/tools';
import ErrorPage from '@/components/error-components/500'
import Comment from '@/components/common/CommentSection';




export default function ArticleDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const md = new MarkdownIt({
        linkify: true,
        highlight: (str, lang) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    const highlightedCode = hljs.highlight(str, { language: lang });
                    const lines = highlightedCode.value.split("\n");
                    const lineNumbers = lines
                        .map((line, index) => `<span class="hljs">${index + 1}</span> ${line}`)
                        .join("\n");
                    return `<pre><code class="hljs ${lang}">\n${lineNumbers}\n</code></pre>`;
                } catch (error) {
                    console.error("Error highlighting code:", error);
                    return "";
                }
            } else {
                return "";
            }
        },
    });

    // Fetch article by ID
    const getArticleById = async (id: string) => {
        const { data }: { data: ResponseType<any> } = await getArticleByIdApi(id);
        return data.code === 200 ? data.data : null;
    };

    // Fetch hot article list
    const getHotArticlesList = async () => {
        const { data }: { data: ResponseType<any> } = await getHotArticlesApi();
        return data.code === 200 ? data.data : null;
    };
    // fetch comment list with this artcle
    const getCommentList = async (page: number) => {
        const { data }: { data: ResponseType<any> } = await getArticleCommentListApi(id, page);
        return data.code === 200 ? data.data : null;
    };

    // Use useRequest to handle requests
    const { data: article, loading: articleLoading, error: articleError } = useRequest<ArticleType, any>(getArticleById, {
        defaultParams: [id],
    });

    const { data: hotArticlesList, loading: hotArticlesListLoading, error: hotArticlesListError } = useRequest<ArticleType[], any>(getHotArticlesList, {
        defaultParams: [],
    });

    const { data: commentList, loading: commentListLoading, error: commentListError } = useRequest<Comment[], any>(getCommentList, {
        defaultParams: [1],
    });
    const {data:views,loading:viewsLoading,error:viewsError} = useRequest<any,any>(increaseArticleViewsApi,{
        defaultParams:[id],
        onSuccess:(data)=>{
            if(data.code===200){
                console.log("文章阅读量加1")
            }
        }
    })



    // Handle loading and errors
    if (hotArticlesListLoading || articleLoading || commentListLoading || viewsLoading) return <Loading />;
    if (hotArticlesListError || articleError || commentListError || viewsError) return <div><ErrorPage /></div>;


    // calculate Reading Time
    const calculateReadingTime = (text: string) => {

        console.log("文章内容长度:", text.length, "文章内容:", text);

        const filterText = text.replace(/[`#*-]+/g, '');

        console.log("过滤掉markdown字符之后的文章长度:", filterText.length, "过滤之后的文章内容:", filterText);

        const wordsPerMinute = 450; // 平均阅读速度（可以根据需要调整）
        const readTime = text.length / wordsPerMinute; // 阅读时间（分钟）
        // 取整
        const readingTimeInMinutes = Math.round(readTime);
        if (readingTimeInMinutes <= 1) {
            return 1
        }
        return readingTimeInMinutes;
    };

 


   
        


    return (
        <>
            {/* 数据流量展示 */}
            <div className="w-full space-y-12 p-4 sm:p-10 md:p-16 lg:p-24 lg:pt-2 pt-12 relative">
                <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                    <img
                        src={article.coverImage}
                        alt="Cover"
                        className="w-full h-full border object-cover rounded-lg shadow-xl"
                    />
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between">
                    {/* 左边文章 */}
                    <div className="w-full lg:w-3/4 space-y-6">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">{article.title}</h1>
                        <div className="flex  flex-wrap lg:flex-row items-start text-gray-600 space-x-4">
                            <div className="flex  items-center gap-2">
                                <User size={16} />
                                <span className='text-sm lg:text-md'>{article.user.nickname}</span>
                            </div>
                            <div className="flex flex-col lg:flex-row  items-start gap-2 lg:gap-6">
                                <div className="flex  items-center gap-2">
                                    <Calendar size={16} />
                                    <span className='text-sm lg:text-md'>{formatDate(convertISOToLocalDateTime(article.created_at, 'Asia/Shanghai'))}</span>
                                </div>

                                <div className="flex  items-center gap-2">
                                    < Eye size={16} />
                                    <span className='text-sm lg:text-md'>{article.views || 0}</span>
                                </div>
                                <div className='flex  items-center gap-2'>
                                    <Clock size={16} />
                                    <span className='text-sm lg:text-md'>
                                        预计阅读时间 {calculateReadingTime(article.content)} 分钟</span>
                                </div>
                            </div>

                        </div>
                        <hr />
                        {/* Render article content with MarkdownIt */}
                        <div
                            className="prose max-w-none break-words w-full"
                            style={{ wordBreak: 'break-word', whiteSpace: 'normal' }}
                            dangerouslySetInnerHTML={{ __html: md.render(article.content) }}
                        />
                        <Comment initialCommentList={commentList} pageId={id}></Comment>
                    </div>

                    {/* 右边推荐 */}
                    <div className="w-full lg:w-1/4 space-y-6 lg:sticky top-24 right-0">
                        <h2 className="text-lg sm:text-xl font-semibold">推荐阅读</h2>
                        <div className="flex flex-col gap-4">
                            {hotArticlesList.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="cursor-pointer flex flex-col space-y-3 w-full rounded-lg shadow-md py-2 px-2 group"
                                    onClick={() => navigate(`/article/${item.id}`)}
                                >
                                    <img
                                        src={item.coverImage}
                                        alt="Recommended Post"
                                        className="w-full object-cover transition-opacity duration-300 group-hover:brightness(200)"
                                    />
                                    <div className='group-hover:text-primary'>{item.title}</div>
                                    <div className='text-xs'>{convertISOToLocalDateTime(item.created_at, "Asia/Shanghai")}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}
