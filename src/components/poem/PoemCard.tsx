import React, { useEffect, useState } from 'react';
import { getPoemList } from '@/apis';
import { useToggle } from 'ahooks';
import Model from '@/components/common/Model';

export default function PoemCardPlane() {
    const [selectedItem, setSelectedItem] = useState(null);
    const [isShowModel, { toggle }] = useToggle(false);
    const [poemList, setPoemList] = useState([]);
    const [loading, setLoading] = useState(true);  // 加载状态
    const [imageError, setImageError] = useState({}); // 记录图片加载错误

    // 点击后记录 item 数据
    const handleClick = (item: any) => {
        setSelectedItem(item);
        toggle();
    };

    // 获取诗卡片列表数据
    const fetchPoemData = async () => {
        setLoading(true);  // 开始加载
        const res = await getPoemList();
        const { data } = res.data;
        setPoemList(data);
        setLoading(false);  // 完成加载
    };

    useEffect(() => {
        fetchPoemData();
    }, []);

    // 处理图片加载错误
    const handleImageError = (id: string) => {
        setImageError(prev => ({ ...prev, [id]: true }));
    };

    return (
        <div className='w-full flex items-center flex-col md:flex-row gap-4 flex-wrap justify-between px-5 py-2'>
            {/* 弹框 */}
            <Model visible={isShowModel} onClose={toggle} item={selectedItem} />

            {/* 判断是否加载中，如果是加载中则显示骨架屏 */}
            {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                    <div className="max-w-80 rounded-md" key={index}>
                        {/* Skeleton for image */}
                        <div className="w-[288px] h-[216px] rounded-md skeleton"></div>
                        {/* Skeleton for title */}
                        <div className="w-[200px] h-5 mt-2 skeleton"></div>
                    </div>
                ))
            ) : (
                poemList && poemList.map((item) => (
                    <div
                        className="max-w-80 rounded-md"
                        key={item.id}
                        onClick={() => handleClick(item)}  // 点击时记录点击的 item 数据
                    >
                        {/* 判断图片是否加载失败，若失败则显示 div 占位符 */}
                        {imageError[item.id] ? (
                            <div className="w-[288px] h-[216px] bg-gray-300 rounded-md flex items-center justify-center">
                                <span className="text-gray-500">Image not available</span>
                            </div>
                        ) : (
                            <img
                                src={item.coverImage}
                                alt=""
                                className={
                                    `${selectedItem?.id === item.id ? 'ring-4 ring-purple-500' : ''} 
                                    max-w-72 object-cover aspect-[4/3] rounded-md 
                                    hover:opacity-75 cursor-pointer transition-all duration-300`
                                }
                                onError={() => handleImageError(item.id)} // 图片加载失败处理
                            />
                        )}
                        <div className='text-base mt-2'>{item.title}</div>
                    </div>
                ))
            )}
        </div>
    );
}
