import React from 'react';
import ArticleCard from './ArticleCard';
import { ArrowRight } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const ArticleSection = ({ title, icon, articles, viewMore }) => {
    const navigator = useNavigate();

    return (
        <div className='w-full space-y-4'>
            {/* 标题 */}
            <div className='flex justify-between '>
                <div className='flex gap-2'>
                    <img src={icon} alt="" className='w-8'/>
                    <div className='text-xl font-bold'>{title}</div>
                </div>
                {/* 查看更多 */}
                <div className='flex items-center gap-2 cursor-pointer' onClick={viewMore}>
                    <div className='text-sm'>查看更多</div>
                    <ArrowRight size={20}></ArrowRight>
                </div>
            </div>

            {/* 文章列表 */}
            <div className='flex flex-col lg:flex-row  gap-4 flex-wrap '>
                {articles.map((article, index) => (
                    <ArticleCard
                        coverImage={article.coverImage}
                        key={article.id}
                        title={article.title}
                        introduction={article.content.slice(0, 50)}
                        author={article.user.nickname}
                        source={article.source || "博客园"} 
                        date={article.created_at}
                        tags={article.tags}
                        handleClick={()=>{navigator(`/article/${article.id}`)}}
                        
                    />
                ))}
            </div>
        </div>
    );
};

export default ArticleSection;
