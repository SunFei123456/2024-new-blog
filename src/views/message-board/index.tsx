import React, { useState, useEffect } from 'react';

import { ResponseType } from '@/type';
import { createCommentApi, getCommentListApi } from '@/apis';
import { convertISOToLocalDateTime, parseUserAgent } from '@/tools';
import UserInfoForm from '@/components/common/UserInfoFormModel';
import Pagination from '@/components/common/Pagination';
import Alert from '@/components/common/Alert';
import { getWallpaper } from '@/apis/wallpaper';

interface Comment {
    id: number;
    nickname: string;
    avatar: string;
    body: string;
    site: string;
    created_at: string;
    city: string;
    user_agent: string;
}

export default function MessageBoard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('最新');
    const [body, setBody] = useState('');
    const [commentList, setCommentList] = useState<Comment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [isDisabled, setIsDisabled] = useState(true);

    const [wallpaperData, setWallpaperData] = useState<any>(null);

    const [alert, setAlert] = useState<{ type: 'error' | 'warning' | 'success'; message: string } | null>(null);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    // 提交表单 创建评论
    // 提交表单 创建评论
    const handleSubmit = (data: { avatar: string; nickname: string; webSite: string }) => {
        const comment = {
            avatar: data.avatar,
            nickname: data.nickname,
            site: data.webSite,
            body: body,
            commentable_type: 'feedback',
            commentable_id: null,
        }
        createCommentApi({
            ...comment
        })
            .then(res => {
                return getCommentList(); // 更新评论列表
            })
            .then(() => {
                setAlert({ type: 'success', message: "评论成功" }); // 成功时设置警报
                // 重置表单和状态
                setBody('');
                setIsModalOpen(false);
            })
            .catch(error => {
                setAlert({ type: 'error', message: error.error.msg }); // 失败时设置警报
            })
    };
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const getBingPic = async () => {
        try {
            const res: any = await getWallpaper();
            if (res.data.code === 200) {
                setWallpaperData(res.data.data);
                const img = new Image();
                img.src = res.data.data.imageUrl; // 设置图片源
                img.onload = () => setIsImageLoaded(true); // 图片加载完成时更新状态
                img.onerror = () => {
                    // 图片加载失败，使用默认壁纸
                    setWallpaperData({
                        imageUrl: "http://127.0.0.1:8080/static/image/comment_default_bg.jpg",
                        title: "默认标题",
                        copyright: "默认版权",
                    });
                    setIsImageLoaded(true); // 设置为已加载状态
                };
            } else {
                throw new Error("获取图片失败");
            }
        } catch (error) {
            console.error("获取 Bing 图片出错:", error);
            // 使用默认壁纸
            setWallpaperData({
                imageUrl: "https://www.sunfei.site/static/image/comment_default_bg.jpg",
                title: "默认标题",
                copyright: "默认版权",
            });
            setIsImageLoaded(true); // 设置为已加载状态
        }
    };



    useEffect(() => {
        getBingPic();
    }, []);


    // 选择最新还是最热
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    // 获取评论列表
    const getCommentList = async (page: number = 1) => {
        const commentable_type = "feedback";
        try {
            const res = await getCommentListApi(commentable_type, page);
            if (Array.isArray(res.data.data)) {
                setCommentList(res.data.data);
                setTotalPages(res.data.meta.last);
                setTotalCount(res.data.meta.count);
                setCurrentPage(page);
            } else {
                console.error('Expected an array but got:', res.data);
            }
        } catch (error) {
            console.error("Error fetching comment list:", error);
            setAlert({ type: 'error', message: '获取评论列表时出错！' }); // 失败时设置警报
        }
    };

    useEffect(() => {
        getCommentList(currentPage);
    }, [currentPage]);

    useEffect(() => {
        if (body) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [body]);


    return (
        <div className="min-h-screen flex flex-col space-y-4 p-4 sm:p-6 md:p-8 lg:p-10 justify-center">
            {/* 背景图容器 */}
            <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]">
                {isImageLoaded ? (
                    <div className="absolute inset-0 bg-cover bg-center filter rounded-md" style={{ backgroundImage: `url(${wallpaperData?.imageUrl})` }}>
                        <div className="relative z-10 flex flex-col space-y-4 items-center justify-center w-full h-full">
                            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">留言板</span>
                            <span className='text-lg sm:text-xl lg:text-2xl font-bold text-white text-center'>
                                你可以在这里畅所欲言，欢迎留言~
                            </span>
                        </div>
                        {/* 左下角的 title */}
                        <div className="absolute left-0 top-0 p-4 text-white">
                            <span className="text-xs sm:text-base">{wallpaperData?.title}</span>
                        </div>
                        {/* 右下角的 copyright */}
                        <div className="absolute right-0 bottom-0 p-4 text-white text-right">
                            <span className="text-xs sm:text-base">{wallpaperData?.copyright}</span>
                        </div>
                    </div>


                ) : (
                    <div className="absolute inset-0 flex flex-col items-center   justify-center  opacity-85">
                        <span className="loading loading-infinity loading-lg" ></span>
                        <span className='text-lg sm:text-xl lg:text-2xl font-bold '>正在奋力加载中...</span>
                    </div>

                )}

            </div>

            {/* 留言输入框 */}
            <div className='w-full h-full flex flex-col gap-4'>
                <span className='text-lg sm:text-xl lg:text-2xl font-bold'>留下您的评论</span>
                <textarea
                    className="w-full p-4 bg-content rounded-lg border placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition duration-300 ease-in-out resize-none"
                    rows={4}
                    placeholder="请输入你的留言..."
                    required
                    value={body}
                    onChange={(e) => {
                        const value = e.target.value;
                        setBody(value);
                        setIsDisabled(value.trim() === ''); // 如果输入为空，设置为禁用
                    }}
                />
                <button
                    className='w-24 sm:w-28 btn btn-primary text-white self-start'
                    onClick={handleOpenModal}
                    disabled={isDisabled}
                >
                    提交
                </button>
            </div>

            {/* 留言列表 */}
            <div className='w-full h-auto flex flex-col space-y-4'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                    <span className='text-base font-bold'>
                        评论数量：<span className='text-primary'>{totalCount}</span>
                    </span>
                    <div className='flex items-center space-x-3 mt-4 sm:mt-0'>
                        <select
                            className="select select-bordered select-primary label w-full max-w-xs"
                            value={selectedOption}
                            onChange={handleSelectChange}
                        >
                            <option value="最新">最新</option>
                            <option value="热度最高">热度最高</option>
                            <option value="作者优选">作者优选</option>
                        </select>
                    </div>
                </div>

                {commentList && commentList.map(comment => (
                    <div key={comment.id} className=" shadow p-4 rounded-lg flex space-x-4">
                        {/* 头像 */}
                        <div className="flex-shrink-0">
                            <div className="avatar">
                                <div
                                    className={`ring ring-primary ring-offset-base-100  w-10 rounded-full  transition duration-300 ease-in-out ${comment.site ? 'cursor-pointer ring-orange-500' : 'cursor-default ring ring-gray-500'}`} // 条件样式
                                    onClick={() => comment.site && window.open(comment.site, '_blank')} // 仅在有 site 时执行
                                >
                                    {comment.avatar && <img src={comment.avatar} alt="Avatar" className="rounded-full" />}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-around w-full">
                            <div className='flex items-center justify-between'>
                                {/* 展示一行 */}
                                <div className="text-primary font-bold text-sm sm:text-base truncate">
                                    {comment.nickname}
                                </div>
                                <div className='flex flex-col space-x-1 justify-center text-xs items-end'>
                                    <span>{comment.city?.substring(0, comment.city.length - 1) || "未知"}</span>
                                    <span >{convertISOToLocalDateTime(comment.created_at, 'Asia/shanghai')}</span>
                                </div>
                            </div>

                            <div className="chat-bubble px-2 rounded-lg text-sm sm:text-base my-1">
                                {comment.body}
                            </div>

                            <div className="text-xs flex items-center gap-1 sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                                <div className="flex items-center space-x-1">
                                    <span>{parseUserAgent(comment.user_agent).os || ""}</span>
                                    <span>{parseUserAgent(comment.user_agent).browserWithVersion || ""}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => getCommentList(page)}
                />
            </div>

            {isModalOpen && (
                <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-slate-600 p-6 rounded-lg shadow-md w-[90%] sm:w-[75%] md:w-[50%] lg:w-[40%]">
                        <UserInfoForm onSubmit={handleSubmit} onClose={handleCloseModal} />
                    </div>
                </div>
            )}

            {alert && (
                <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
            )}
        </div>
    );
}
