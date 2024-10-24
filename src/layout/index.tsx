import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GitHub, Settings } from 'react-feather';
import JueJin from '@/assets/juejin.svg'
import Modal from '@/components/setting/Modal';
import Alert from '@/components/common/Alert';

import naturalTheme from "@/assets/natural.webp";
import WebSocketComponent from '@/components/websocket';




const Layout = ({ themeList }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });
    const location = useLocation(); // 获取当前路由位置
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 控制移动端菜单的展开/折叠状态
    const [alert, setAlert] = useState<{ type: 'error' | 'warning' | 'success'; message: string } | null>(null);

    const [bgUrl, setBgUrl] = useState('')

    const [showConfigModal, setShowConfigModal] = useState(false)

    // 从本地存储获取当前是否背景模式状态
    const [isBgMode, setIsBgMode] = useState(() => {
        const savedMode = localStorage.getItem('isBgMode');
        return savedMode === 'true'; // Convert string to boolean
    });


    // 从本地存储获取当前字体
    const [curfont, setCurFont] = useState(localStorage.getItem('font'));

    /**
     * 切换主题并保存到本地存储
     * @param theme {string} 主题名称
     */
    const changeTheme = (theme) => {
        // 如果当前localStorage 里面的theme 为 ocean_scent || city_scent || natural_scent, 自定义图片背景模式下, 不可以应用色彩主题
        // 当前本地的theme主题
        const curTheme = localStorage.getItem('theme')
        if (curTheme === 'ocean_scent' || curTheme === 'city_scent' || curTheme === 'natural_scent' || curTheme === 'morning_fog_scent') {
            setAlert({ type: 'warning', message: '自定义图片背景模式下不支持色彩主题' })
            return;
        } else {
            localStorage.setItem('theme', theme);
            document.documentElement.setAttribute('data-theme', theme);
        }

    };
    const toggleDarkMode = () => {
        if (isBgMode) {
            setAlert({ type: 'warning', message: '图片模式下不支持黑白主题切换,请先到设置里面关闭图片背景' });
            return;
        }
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);
        localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
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

    const setSiteBgUrl = (url, theme) => {
        setBgUrl(url);
        setIsBgMode(true);
        localStorage.setItem('isBgMode', 'true'); // Update local storage
        localStorage.setItem('siteBgUrl', url);
        localStorage.setItem('theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
    };



    useEffect(() => {
        const siteBgUrl = localStorage.getItem('siteBgUrl')
        if (siteBgUrl) {
            setBgUrl(siteBgUrl)
        }
        const font = localStorage.getItem('font')
        if (font) {
            document.documentElement.setAttribute('data-font', font);
        }
    }, [])
    // 恢复到默认色彩主题模式下
    const backDefaultThemeMode = () => {
        if (isBgMode) {
            setIsBgMode(false);
            localStorage.setItem('isBgMode', 'false'); // Update local storage
            setBgUrl(null);
            localStorage.setItem('siteBgUrl', null);
            localStorage.setItem('theme', 'light');
            document.documentElement.setAttribute('data-theme', 'light');
        } else {
            setIsBgMode(true);

            setBgUrl(naturalTheme);
            localStorage.setItem('isBgMode', 'true'); // Update local storage
            localStorage.setItem('siteBgUrl', naturalTheme);
            localStorage.setItem('theme', 'natural_scent');
            document.documentElement.setAttribute('data-theme', 'natural_scent');
        }
    };

    // 站点字体切换
    const changeFont = (font: string) => {
        setCurFont(font);
        localStorage.setItem('font', font);
        document.documentElement.setAttribute('data-font', font);
    };



    return (
        <>
            <div className="w-full flex flex-col" >
                <img
                    id='siteBg'
                    src={bgUrl}
                    alt="background"
                    className="fixed top-0 left-0 w-full h-full object-cover -z-10 brightness-90"
                    style={{ filter: 'brightness(0.9)' }}
                />
                {/* <div className="w-full flex flex-col "> */}
                {/* Header */}
                <header className="shadow-sm glass fixed top-0 left-0 right-0 z-20">
                    <div className="navbar ">
                        <div className="flex-1">
                            <a className="btn btn-ghost text-xl">SunFei个人空间</a>
                        </div>
                        {/* 需要修复的部分 */}
                        <label className="swap swap-rotate mr-3">
                            {/* this hidden checkbox controls the state */}
                            <input
                                type="checkbox"
                                className="theme-controller"
                                checked={isDarkMode}
                                onChange={toggleDarkMode}
                            />
                            {/* sun icon */}
                            <svg
                                className="swap-off h-7 w-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            {/* moon icon */}
                            <svg
                                className="swap-on h-7 w-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                        {/* 移动端设置按钮 */}
                        <Settings size={20} className='sm:hidden cursor-pointer' onClick={() => setShowConfigModal(!showConfigModal)}></Settings>

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
                            <div className='flex'>
                                <motion.div
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    variants={mobileMenuVariants}
                                    className="sm:hidden flex flex-col px-4 py-4"
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
                            </div>

                        )}
                    </AnimatePresence>
                </header>
                {/* PC端设置按钮，左下角 */}
                <div className='hidden sm:flex w-10 h-10 fixed left-5 bottom-10 bg-primary p-2 rounded-full items-center justify-center cursor-pointer hover:animate-spin'
                    onClick={() => setShowConfigModal(!showConfigModal)}>
                    <Settings size={20} color='#ffffff' />
                </div>
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
                    <footer className="footer flex  lg:flex-row p-6  lg:p-20 lg:py-10 place-content-around  py-10">
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
                    <footer className="footer  text-neutral-content items-center p-6">
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

                {/* 自定义配置项 左下 */}
                {/* <div className='w-10 h-10 fixed left-5 bottom-10 bg-primary p-2 rounded-full flex items-center justify-center cursor-pointer hover:animate-spin'>
                    <Settings size={20} color='#232323' onClick={() => setShowConfigModal(!showConfigModal)}></Settings>
                </div> */}

                {/* modal */}
                <Modal
                    visible={showConfigModal}
                    onClose={() => setShowConfigModal(false)}
                    setSiteBgUrl={setSiteBgUrl}
                    isBgMode={isBgMode}
                    backDefaultThemeMode={() => backDefaultThemeMode()}
                    changeFont={changeFont}
                    curfont={curfont}
                />

                {/* 警告 */}
                {/* 警报信息 */}
                {alert && (
                    <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
                )}

                <WebSocketComponent></WebSocketComponent>
            </div>
        </>
    );
};

export default Layout;
