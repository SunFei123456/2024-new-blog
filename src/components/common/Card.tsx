import { convertISOToLocalDateTime, formatDate } from '@/tools';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Card(item: any) {
    const navigator = useNavigate();
    return (
        <div className="w-full lg:max-w-xs  rounded-lg shadow-md overflow-hidden border cursor-pointer "
            onClick={() => navigator(`/cognitive_expansion/article/${item.item.id}`)}
        >
            <div className="flex items-center p-4 pl-0">
                {/* 用户名和时间 */}
                <div className="ml-3">
                    <div className="text-sm font-bold ">{item.nickname || "sunfei"}</div>
                    <div className="text-xs ">{convertISOToLocalDateTime(item.item.created_at, 'Asia/Shanghai')}</div>
                </div>
            </div>

            {/* 图片部分 */}
            <div className="flex justify-center">
                <img
                    className="w-full h-40 object-cover"
                    src={item.item.cover_image}
                    alt="Intel and Qualcomm"
                />
            </div>

            {/* 文本内容 */}
            <div className="p-4">
                <p className="text-sm  font-semibold">
                    {item.item.title}
                </p>
            </div>
        </div>
    );
}
