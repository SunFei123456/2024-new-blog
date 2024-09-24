import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GitHub } from 'react-feather';
import JueJin from '@/assets/juejin.svg'




const Layout = ({ themeList }) => {
    const location = useLocation(); // 获取当前路由位置
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 控制移动端菜单的展开/折叠状态



    /**
     * 切换主题并保存到本地存储
     * @param theme {string} 主题名称
     */
    const changeTheme = (theme) => {
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    };

    // 页面过渡动画
    const pageTransition = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0.2 }
    };

    // 定义移动端菜单展开/收起动画
    const mobileMenuVariants = {
        closed: {
            height: 0,
            opacity: 0,
            transition: { duration: 0.3 }
        },
        open: {
            height: 'auto',
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    return (
        <>
            <div className="w-full h-screen flex flex-col">
                {/* Header */}
                <header className="shadow-sm glass fixed top-0 left-0 right-0 z-20">
                    <div className="navbar bg-base-100">
                        <div className="flex-1">
                            <a className="btn btn-ghost text-xl">孙飞个人工作空间</a>
                        </div>

                        {/* 移动端菜单按钮 */}
                        <div className="sm:hidden flex items-center">
                            <button
                                className="btn btn-ghost"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* PC端菜单 */}
                        <div className={`flex-none dropdown dropdown-end hidden sm:flex`}>
                            <ul className="menu menu-horizontal px-1">
                                <li><Link to="/">首页</Link></li>
                                <li><Link to="/moment">朋友圈</Link></li>
                                <li><Link to="/poem">诗</Link></li>
                                <li><Link to="/cognitive_expansion">认知扩展</Link></li>
                                <li><Link to="/hotNews">近期热点</Link></li>
                                <li><Link to="/website">宝藏网站</Link></li>
                                <li><Link to="/article">技术文章</Link></li>
                                <li><Link to="/messageBoard">留言板</Link></li>
                                <li><Link to="/process">项目进度</Link></li>
                                <li>
                                    <details>
                                        <summary>主题选择器</summary>
                                        <ul className="space-y-2 dropdown-content flex flex-col bg-base-200 w-48 rounded-t-none p-4 h-96 overflow-auto">
                                            {themeList.map((item) => (
                                                <li key={item.id} className="w-full">
                                                    <button
                                                        data-set-theme={item.value}
                                                        style={{ backgroundColor: item.color }}
                                                        className="w-full h-10 rounded-md text-center"
                                                        onClick={() => changeTheme(item.value)}
                                                    >
                                                        <span style={{ color: item.textColor }}>{item.name}</span>
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </details>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* 移动端菜单 (动画化) */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial="closed"
                                animate="open"
                                exit="closed"
                                variants={mobileMenuVariants}
                                className="sm:hidden flex flex-col bg-base-100 px-4 py-4"
                            >
                                <ul className="menu space-y-2">
                                    <li><Link to="/" onClick={() => setIsMobileMenuOpen(false)}>首页</Link></li>
                                    <li><Link to="/moment" onClick={() => setIsMobileMenuOpen(false)}>朋友圈</Link></li>
                                    <li><Link to="/poem" onClick={() => setIsMobileMenuOpen(false)}>诗</Link></li>
                                    <li><Link to="/cognitive_expansion" onClick={() => setIsMobileMenuOpen(false)}>认知扩展</Link></li>
                                    <li><Link to="/hotNews" onClick={() => setIsMobileMenuOpen(false)}>近期热点</Link></li>
                                    <li><Link to="/website" onClick={() => setIsMobileMenuOpen(false)}>宝藏网站</Link></li>
                                    <li><Link to="/article" onClick={() => setIsMobileMenuOpen(false)}>技术文章</Link></li>
                                    <li><Link to="/messageBoard" onClick={() => setIsMobileMenuOpen(false)}>留言板</Link></li>
                                    <li><Link to="/process" onClick={() => setIsMobileMenuOpen(false)}>项目进度</Link></li>
                                    <li className="">
                                        <details>
                                            <summary>主题选择器</summary>
                                            <ul className="space-y-2 bg-base-200 w-full rounded-t-none p-4 px-2 h-96 overflow-auto">
                                                {themeList.map((item) => (
                                                    <li key={item.id} >
                                                        <button
                                                            data-set-theme={item.value}
                                                            style={{ backgroundColor: item.color }}
                                                            className="w-full h-10 rounded-md text-center"
                                                            onClick={() => {
                                                                changeTheme(item.value)
                                                                setIsMobileMenuOpen(false)
                                                            }}
                                                        >
                                                            <span style={{ color: item.textColor }}>{item.name}</span>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </details>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </header>

                {/* Content */}
                <main className="flex-1  mt-[4rem] px-4 sm:px-10 md:px-20 py-6 sm:py-8 md:py-10">
                    {/* 使用 AnimatePresence 和 motion 实现路由动画 */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname} // 路由变化时触发动画
                            initial={pageTransition.initial}
                            animate={pageTransition.animate}
                            exit={pageTransition.exit}
                            transition={pageTransition.transition}
                            className="w-full h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>

                {/* footer */}
                <div>
                    <div className='mt-20 lg:mt-24 w-full h-auto flex flex-col space-y-2 items-center justify-center'>
                        <div className='flex flex-col items-center space-y-2'>
                            <span className='text-xl lg:text-2xl font-bold  '>心安事随
                            </span>
                            <span className='text-xs text-neutral'>一个i人</span>
                        </div>

                        <span>极简主义 实用主义 做好每一件小事</span>
                    </div>
                    <footer className="footer flex  lg:flex-row p-6  lg:p-20 lg:py-10 place-content-around text-base-content  py-10">
                        <nav>
                            <h6 className="footer-title">主页导航</h6>
                            <Link to="/" className="link link-hover">首页</Link>
                            <Link to="/poem" className="link link-hover">诗</Link>
                            <Link to="/moment" className="link link-hover">朋友圈</Link>
                            <Link to="/hotNews" className="link link-hover">每日热点</Link>
                            <Link to="/website" className="link link-hover">宝藏网站</Link>
                            <Link to="/messageBoard" className="link link-hover">留言板</Link>
                        </nav>
                        <nav>
                            <h6 className="footer-title">文章模块</h6>
                            <Link to="/article" className="link link-hover">文章首页</Link>
                            <Link to="/article/Vue/list" className="link link-hover">Vue</Link>
                            <Link to="/article/React/list" className="link link-hover">React</Link>
                            <Link to="/article/Go/list" className="link link-hover">Go</Link>
                            <Link to="/article/JavaScript/list" className="link link-hover">JavaScript</Link>
                        </nav>
                        <nav>
                            <h6 className="footer-title">实用工具</h6>
                            <Link to="/website" className="link link-hover">AI 工具</Link>
                            <Link to="/website" className="link link-hover">素材网站</Link>
                            <Link to="/website" className="link link-hover">UI/UX 设计</Link>
                        </nav>
                    </footer>
                    <footer className="footer bg-neutral text-neutral-content items-center p-6">
                        <aside className="grid-flow-col items-center">
                            <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
                        </aside>
                        <nav className="grid-flow-col gap-4 items-center md:place-self-center md:justify-self-end">
                            <div className="tooltip tooltip-info" data-tip="全球最大男性交友平台">
                                <a href="https://github.com/SunFei123456" target="_blank"  >
                                    <div className='w-10 h-10 flex items-center justify-center bg-gray-500  rounded-md transition-all duration-200 ease-linear hover:scale-110'>
                                        <GitHub size={28} className='p-1 w-7  rounded-full' />
                                    </div>
                                </a>
                            </div>
                            <div className="tooltip tooltip-info" data-tip="我的另外一个网站">
                                <a href="https://www.sunfei.site" target="_blank"  >
                                    <div className='w-10 h-10 flex items-center justify-center bg-gray-500  rounded-md transition-all duration-200 ease-linear hover:scale-110'>
                                        <span className='text-[1.55rem]'>🤗</span>
                                    </div>
                                </a>
                            </div>
                            <div className="tooltip tooltip-info" data-tip="掘金账号">
                                <a href="https://juejin.cn/user/506236035676238" target="_blank" >
                                    <div className='w-10 h-10 flex items-center justify-center bg-gray-500  rounded-md transition-all duration-200 ease-linear hover:scale-110'>
                                        <img src={JueJin} alt="" className='w-7 h-7' />
                                    </div>
                                </a>
                            </div>

                        </nav>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default Layout;
