import React from 'react';

import Zhanwei from '@/assets/000007lbN3I.jpg'; // 假设占位图在同目录下

import { useNavigate } from 'react-router-dom';
import { convertISOToLocalDateTime } from '@/tools';

const ArticleCard = ({ coverImage, title, introduction, author, source, date, tags, handleClick }) => {
    const navigate = useNavigate();
    console.log(tags);


    return (
        <div className='w-full lg:w-[20%] flex flex-col rounded-md shadow overflow-hidden cursor-pointer hover:text-primary duration-200 ease-in-out' onClick={handleClick} >
            {/* 上方图片 */}
            <div className='relative'>
                <img
                    src={coverImage}
                    alt="文章图片"
                    className='w-full h-40 object-cover'
                />
                {/* 磨砂毛玻璃效果 */}
                <div className='space-y-2 absolute bottom-0 left-0 right-0 h-16 text-[oklch(var(--b1))] bg-base-content bg-opacity-30 backdrop-filter backdrop-blur-sm flex flex-col justify-center p-2 rounded-t-md'>
                    {/* 作者 */}
                    <span className='text-sm  font-bold'>作者: {author}</span>
                    <div className='flex justify-between'>
                        {/* 来源 */}
                        <span className='text-sm '>来源：{source}</span>
                        {/* 时间 */}
                        <span className='text-sm'>{convertISOToLocalDateTime(date, "Asia/Shanghai")}</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col  p-3'>
                {/* 标题 */}
                <span className='text-lg font-semibold truncate'>{title}</span>
                {/* 摘要 */}
                <span className='text-sm mt-1 line-clamp-2'>{introduction.replace(/[`#*]+/g, '')}</span>
                {/* 标签 */}
                <div className='flex flex-wrap gap-2'>
                    {tags.slice(1, -1).replace(/"/g, '').split(',').map((item: string, index: number) => (
                        <span
                            key={index}
                            className='badge badge-primary badge-outline text-center text-xs mt-2 px-2 py-1 rounded-md'
                        >
                            {item}
                        </span>
                    ))}
                </div>




            </div>
        </div>
    );
};

export default ArticleCard;
