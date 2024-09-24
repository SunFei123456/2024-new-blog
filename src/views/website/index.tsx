import React, { useState, useEffect, useMemo } from 'react'
import Empty from '@/assets/empty.png'
import { PenTool, Slack, Code, Figma } from 'react-feather'
import { motion } from 'framer-motion'
import Plane from '@/components/website/Plane' // 引入子组件
import { getWebsiteByCategory, getTagsByCategory, getWebsiteByTag } from '@/apis'
import Loading from '@/components/common/Loading'


const Website = () => {
    const [active, setActive] = useState(0)
    const [loading, setLoading] = useState(false);
    const [websiteData, setWebsiteData] = useState([])
    const [websiteTags, setWebsiteTags] = useState([])


    // Tab 列表
    const tabList = useMemo(() => [
        { name: "UI设计", icon: <PenTool size={18} />, category: "ui" },
        { name: "前端开发", icon: <Code size={18} />, category: "frontend" },
        { name: "素材资源", icon: <Figma size={18} />, category: "resource" },
        { name: "AI工具", icon: <Slack size={18} />, category: "ai" }
    ], []);

    // 根据 tab 获取网站数据
    const getWebsiteList = async (category: string) => {
        setLoading(true);
        try {
            const res = await getWebsiteByCategory(category);
            setWebsiteData(res.data.data);
        } catch (error) {
            console.error("Error fetching website list:", error);
        } finally {
            setLoading(false);
        }
    }
    // 根据category获取该类别下的所有tags
    const getTagList = async (category: string) => {
        const res = await getTagsByCategory(category)
        setWebsiteTags(res.data.data)
    }
    // 根据tags参数获取指定的网站列表信息
    const getWebsiteWithTags = async (tags: any) => {
        const res = await getWebsiteByTag(tags)
        setWebsiteData(res.data.data)
    }

    // 监听 active 的变化
    useEffect(() => {
        const category = tabList[active].category
        getWebsiteList(category)
        getTagList(category)
    }, [active])

    // 动画效果
    const tabVariants = {
        visible: { opacity: 1, scale: 1 },
        inactive: { opacity: 0.65, scale: 0.9 }
    }

    return (
        <div className='w-full flex flex-col items-center justify-center'>
            <ul className="bg-base-200 w-full justify-between menu-horizontal gap-3 py-3 mt-4 menu space-x-3 lg:menu-horizontal rounded-box">
                {tabList.map((item, index) => (
                    <motion.li
                        className='rounded-md bg-base-100'
                        key={index}
                        initial="hidden"
                        animate={active === index ? "visible" : "inactive"}
                        variants={tabVariants}
                        transition={{ duration: 0.3 }}
                    >
                        <div
                            onClick={() => setActive(index)}
                            className={`flex items-center space-x-2 cursor-pointer ${active === index ? "text-primary" : ""}`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                            <span className="badge badge-primary outline-double badge-sm">{15 + "+"}</span>
                        </div>
                    </motion.li>
                ))}
            </ul>

            <div className='w-full'>
                {loading ? (
                    <div className='w-full h-[50vh] flex flex-col items-center justify-center'> <Loading  /></div>
                ) : websiteData.length === 0 ? (
                    <div className='mt-10 flex flex-col items-center justify-center'>
                        <img src={Empty} alt="" />
                        <p className='textarea-md'>该模块暂未收录任何内容, 请联系博主进行添加~</p>
                    </div>
                ) : (
                    <Plane
                        websiteList={websiteData}
                        websiteTags={websiteTags}
                        onTagClick={getWebsiteWithTags}
                        onShowAll={() => getWebsiteList(tabList[active].category) }
                    />
                )}
            </div>
        </div>
    )
}


export default Website