import React, { useState } from 'react'

import WebsiteInfoCard from '@/components/website/WebsiteInfoCard'
import { Hash } from 'react-feather'

export default function Plane({ websiteList, websiteTags, onTagClick, onShowAll }) {

    const [active, setActive] = useState(null)
    // 调用父组件传递过来的方法 并把当前标签样式进行修改
    const onClickTag = (tag: string, index: number) => {
        setActive(index)
        onTagClick(tag)
    }
    // 展示全部
    const showAll = () => {
        setActive(null)

        onShowAll()
    }
    return (
        <div className='w-full flex flex-wrap items-center justify-start gap-4'>
            {/* 标签化tag栏目 */}
            <div className='w-full mt-4 flex flex-wrap items-center justify-start gap-2 sm:gap-4'>
                {websiteTags && websiteTags.map((item, index) => (
                    <span key={index}
                        onClick={() => onClickTag(item, index)}
                        style={{ color: index === active ? '#ffffff' : '', backgroundColor: index === active ? '#333333' : '' }}

                        className="badge badge-primary badge-outline text-xs sm:text-sm cursor-pointer ">{'#' + item}</span>
                ))}

                <div className='flex items-center text-sm badge text-[#ff7500] badge-outline'
                    onClick={() => showAll()}>
                    <Hash size={14} /><span>全部</span>
                </div>
            </div>

            {/* 网站信息列表 */}
            {websiteList && websiteList.map((item) => (
                <WebsiteInfoCard
                    key={item.id}
                    logo={item.logo}
                    name={item.name}
                    desc={item.desc}
                    href={item.href} />
            ))}
        </div>
    )
}
