/*
 * @Author: 孙飞
 * @Date: 2024-09-04 17:55:51
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-05 22:02:34
 * @Description: 面板, 用来承载一个个小卡片的载体~
 */

import { getWebsiteByCategory } from '@/apis';
import WebsiteInfoCard from '@/components/website/WebsiteInfoCard';
import { AxiosResponse } from 'axios';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'

export default function Plane() {
    // 获取路由参数
    const { category } = useParams()
    const [websiteList, setWebsiteList] = useState([])
    const getWebsiteList = async (category: string) => {
        const res: AxiosResponse<any> = await getWebsiteByCategory(category)
        setWebsiteList(res.data.data)
    }
    useEffect(() => {
        getWebsiteList(category) // 默认展示ui
    }, [category])

    return (
        <div className='w-full p-6 flex flex-wrap items-center justify-center gap-4 '>
            {websiteList && websiteList.map((item) => <WebsiteInfoCard
                key={item.id}
                icon={item.logo}
                name={item.name}
                desc={item.desc}
                href={item.href} />)}

        </div>
    )
}

