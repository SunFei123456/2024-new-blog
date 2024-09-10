/*
 * @Author: 孙飞
 * @Date: 2024-09-07 15:10:44
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-08 12:48:57
 * @Description: 诗卡片面板~
 */
import React, { useEffect, useState } from 'react';
import { getPoemList } from '@/apis';
import { useToggle } from 'ahooks';
import Model from '@/components/common/Model';


export default function PoemCardPlane() {
    // 设置点击的 item 数据
    const [selectedItem, setSelectedItem] = useState(null);

    const [isShowModel, { toggle }] = useToggle(false);

    // 点击后记录 item 数据
    const handleClick = (item: any) => {
        console.log("PoemCard 文件的14行,接收的 item:", item);
        // 记录选中的 item,并且设
        setSelectedItem(item); // 如果再次点击相同的 item，取消选中
        // 切换模态框
        toggle();

    };

    const [poemList, setPoemList] = useState([]);

    const fetchPoemData = async () => {
        const res = await getPoemList();
        const { data } = res.data;
        setPoemList(data);
    };

    useEffect(() => {
        fetchPoemData();
    }, []);

    return (
        <div className='w-full flex flex-col md:flex-row gap-4 flex-wrap justify-between px-5 py-2'>
            {/* 弹框 */}
            <Model visible={isShowModel} onClose={toggle} item={selectedItem} />

            {poemList && poemList.map((item) => (
                <div
                    className="max-w-80 rounded-md"
                    key={item.id}
                    onClick={() => handleClick(item)} // 点击时记录点击的 item 数据,并且进行传递
                >
                    {/* 图片和标题 */}
                    <img
                        src={item.coverImage}
                        alt=""
                        className={
                            `${selectedItem?.id === item.id ? 'ring-4 ring-purple-500' : ''} 
                            max-w-72  object-cover aspect-[4/3] rounded-md 
                            hover:opacity-75 cursor-pointer transition-all duration-300`
                        }
                    />
                    <div className='text-base mt-2'>{item.title}</div>
                </div>
            ))}
        </div>
    );
}
