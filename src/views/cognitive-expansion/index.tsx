import React, { useEffect, useState } from 'react';
import Card from '@/components/common/Card';
import Drawer from '@/components/common/Drawer';
import { useToggle, useDebounce } from 'ahooks';
import { ArrowRight, ArrowUp } from 'react-feather';
import { getCEAllTagsApi, getCELatestArticlesApi,getCEArticlesByTagApi } from '@/apis'
import { useNavigate } from 'react-router-dom';

export default function CognitiveExpansion() {
    const [isShowDrawer, { toggle }] = useToggle(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [scrolling, setScrolling] = useState(false);
    const navigate = useNavigate();
    const [tags, setTags] = useState([]);
    const [articleList, setArticleList] = useState([]);

    const getAllTags = async () => {
        const res = await getCEAllTagsApi()
        setTags(res.data.data)
    }
    const getArticleList = async () => {
        const res = await getCELatestArticlesApi()
        setArticleList(res.data.data)
    }
    // 根据tag获取文章列表
    const getArticleListByTag = async (tag: string) => {
        const res = await getCEArticlesByTagApi(tag)
        setArticleList(res.data.data)
    }

    useEffect(() => {
        getAllTags()
        getArticleList()
    }, [])
    const debouncedScrolling = useDebounce(scrolling, { wait: 100 });

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };


    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setShowScrollToTop(debouncedScrolling);
    }, [debouncedScrolling]);

    return (
        <div className='flex flex-col w-full space-y-8'>
            {/* 导语 */}
            <div className="hero min-h-screen" style={{
                backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
            }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">认知扩展</h1>
                        <p className="mb-5">
                            其实有些东西并不是很难,只是你从未尝试去了解,认识,学习它. 当你真正地去了解之后,你会发现其实并没有你想象地那么困难.所以大胆去尝试自己未曾涉足的领域吧.
                        </p>
                        <button className="btn btn-primary text-white">加油</button>
                    </div>
                </div>
            </div>
            {/* 文章卡片 */}
            <div className='flex w-full flex-wrap gap-4 justify-start flex-col lg:flex-row '>
                {articleList.map((item) => (
                    <Card
                        key={item.id} // 使用 item.id 作为唯一 key
                        item={item}
                    />
                ))}
            </div>


            {/* Drawer */}
            <div>
                <Drawer visible={isShowDrawer} onClose={toggle}>
                    <div className='w-full flex flex-wrap justify-around p-3 gap-3'>
                        {tags.map(topic => (
                            <button key={topic} className='btn w-2/5 text-center' onClick={() => getArticleListByTag(topic)}># {topic}</button>
                        ))}
                    </div>
                </Drawer>
            </div>

            {/* 按钮 --> 呼出抽屉 */}
            <button
                className="flex items-center z-40 justify-between px-2 h-[2.2rem] rounded-md fixed bottom-5 left-5 cursor-pointer bg-base-500 bg-violet-600"
                onClick={toggle}
                aria-label="Toggle menu"
            >
                <ArrowRight size={20} color='white' />
            </button>

            {/* 返回顶部 */}
            {showScrollToTop && (
                <button
                    className="flex items-center justify-between px-2 h-[2.2rem] rounded-md fixed bottom-5 right-5 cursor-pointer bg-base-500 bg-violet-600"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={20} color='white' />
                </button>
            )}
        </div>
    );
}
