import React, { useState, useEffect } from 'react';
import UserInfoForm from '@/components/common/UserInfoFormModel';
import { createCommentApi, getCommentListApi } from '@/apis';
import { convertISOToLocalDateTime, parseUserAgent } from '@/tools';
import Pagination from '@/components/common/Pagination'; // 确保路径正确

interface Comment {
    id: number;
    nickname: string;
    avatar: string;
    body: string;
    created_at: string;
    city: string;
    user_agent: string;
}

export default function MessageBoard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('最新');
    const [comment, setComment] = useState('');
    const [commentList, setCommentList] = useState<Comment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);


    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleSubmit = async (data: { avatar: string; nickname: string; }) => {
        console.log('User Info Submitted:', data);
        console.log("留言内容", comment);

        try {
            const res = await createCommentApi({
                avatar: data.avatar,
                nickname: data.nickname,
                body: comment,
                commentable_type: 'feedback',
                commentable_id: null,
            });

            console.log("res", res);
            await getCommentList(); // 更新评论列表
        } catch (error) {
            console.error("Error creating comment:", error);
        }

        handleCloseModal();
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const getCommentList = async (page: number = 1) => {
        const commentable_type = "feedback";
        try {
            const res = await getCommentListApi(commentable_type, page);
            console.log('API Response:', res.data);
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
        }
    };

    useEffect(() => {
        getCommentList(currentPage);
    }, [currentPage]);

    return (
        <div className="min-h-screen flex flex-col space-y-4 p-4 sm:p-6 md:p-8 lg:p-10 justify-center">
            {/* 背景图容器 */}
            <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]">
                <div className="absolute inset-0 bg-[url('/src/assets/hobbit.jpg')] bg-cover bg-center filter blur-[3px]"></div>
                <div className="relative z-10 flex flex-col space-y-4 items-center justify-center w-full h-full">
                    <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">留言板</span>
                    <span className='text-lg sm:text-xl lg:text-2xl font-bold text-white text-center'>
                        你可以在这里畅所欲言，欢迎留言~
                    </span>
                </div>
            </div>

            {/* 留言输入框 */}
            <div className='w-full h-full flex flex-col gap-4'>
                <span className='text-lg sm:text-xl lg:text-2xl font-bold'>留下您的评论</span>
                <textarea
                    className="w-full p-4 bg-content rounded-lg border placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out resize-none"
                    rows={4}  // 调整留言框的高度
                    placeholder="请输入你的留言..."
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className='w-24 sm:w-28 btn btn-primary text-white self-start'
                    onClick={handleOpenModal}
                >
                    提交
                </button>
            </div>

            {/* 留言列表 */}
            <div className='w-full h-auto flex flex-col space-y-4'>
                {/* 评论数 + 操作 */}
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                    <span className='text-base font-bold'>
                        评论数量：<span className='text-primary'>{totalCount}</span>
                    </span>
                    <div className='flex items-center space-x-3 mt-4 sm:mt-0'>
                        <select
                            className="select select-bordered w-full max-w-xs"
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
                    <div key={comment.id} className="bg-base-100  border p-4 rounded-lg flex space-x-4">
                        {/* 左侧头像部分 */}
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs sm:text-sm">
                                {comment.avatar}
                            </div>
                        </div>

                        {/* 右侧内容部分 */}
                        <div className="flex flex-col justify-around w-full">
                            {/* 上 */}
                            <div className='flex items-center justify-between'>
                                <div className="text-primary font-bold text-sm sm:text-base">
                                    {comment.nickname}
                                </div>
                                {/* 地址 + 时间 */}
                                <div className='flex flex-col space-x-1 justify-center text-sm items-end'>
                                    <span>{comment.city?.substring(0, comment.city.length - 1) || "未知"}</span>
                                    <span>{convertISOToLocalDateTime(comment.created_at,'Asia/shanghai')}</span>
                                </div>
                            </div>

                            {/* 评论内容 */}
                            <div className="chat-bubble px-2  rounded-lg text-sm sm:text-base my-1">
                                {comment.body}
                            </div>

                            {/* 时间 + 平台信息 + 地址 */}
                            <div className="text-xs flex items-center  gap-1 sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                                <div className="flex items-center space-x-1">
                                    <div className="flex items-center space-x-1">
                                        <span>{parseUserAgent(comment.user_agent).os || ""}</span>
                                        <span>{parseUserAgent(comment.user_agent).browserWithVersion || ""}</span>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                ))}


                {/* 分页器 */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => getCommentList(page)}
                />
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-primary p-6 rounded-lg shadow-md w-[90%] sm:w-[75%] md:w-[50%] lg:w-[40%]">
                        <UserInfoForm onSubmit={handleSubmit} />
                    </div>
                </div>
            )}
        </div>
    );
}
