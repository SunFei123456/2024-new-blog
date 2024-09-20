import React, { useState, useEffect } from 'react';
import Pagination from './Pagination'; // Assume you have a Pagination component
import { convertISOToLocalDateTime, parseUserAgent } from '@/tools/index'; // Assume you have utility functions
import UserInfoForm from './UserInfoFormModel';
import { createCommentApi, getArticleCommentListApi } from '@/apis';

interface CommentProps {
  initialCommentList: any[];
  pageId: string;
}

const Comment: React.FC<CommentProps> = ({ initialCommentList = [], pageId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [selectedOption, setSelectedOption] = useState('最新');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [commentList, setCommentList] = useState(initialCommentList);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (data: { avatar: string; nickname: string; }) => {
    console.log('User Info Submitted:', data);
    console.log("留言内容", comment);

    try {
      await createCommentApi({
        avatar: data.avatar,
        nickname: data.nickname,
        body: comment,
        commentable_type: 'article',
        commentable_id: Number(pageId),
      });

      getCommentListWithArticle(); // Refresh the comment list
    } catch (error) {
      console.error("Error creating comment:", error);
    }

    handleCloseModal();
  };

  const getCommentListWithArticle = async (page: number = 1) => {
    try {
      const res = await getArticleCommentListApi(pageId, page);
      setCommentList(res.data.data);
      setTotalPages(res.data.meta.last);
      setTotalCount(res.data.meta.count);
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  useEffect(() => {
    getCommentListWithArticle(currentPage);
  }, [currentPage]);

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSelectedOption(option);
    // todo add new option with fetch data 
    try {
      const res = await getArticleCommentListApi(pageId, currentPage);
      setCommentList(res.data.data);
      setTotalPages(res.data.meta.last);
      setTotalCount(res.data.meta.count);
    } catch (error) {
      console.error("Error fetching sorted comments:", error);
    }
  };

  return (
    <div className='w-full h-full flex flex-col gap-4'>
      {/* Comment Input Box */}
      <div className='w-full h-full flex flex-col gap-4'>
        <span className='text-lg sm:text-xl lg:text-2xl font-bold'>评论</span>
        <textarea
          className="w-full p-4 bg-content rounded-lg  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out resize-none"
          rows={4}
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

      {/* Comment List */}
      <div className='w-full h-auto flex flex-col space-y-4'>
        {/* Comment Count + Options */}
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

        {commentList.map(comment => (
          <div key={comment.id} className="bg-base-100  p-4 rounded-lg flex space-x-4">
            {/* Left Side Avatar */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs sm:text-sm">
                {comment.avatar}
              </div>
            </div>

            {/* Right Side Content */}
            <div className="flex flex-col justify-around w-full">
              {/* Top */}
              <div className='flex items-center justify-between'>
                <div className="text-primary font-bold text-sm sm:text-base">
                  {comment.nickname}
                </div>
                {/* City + Time */}
                <div className='flex flex-col space-x-1 justify-center text-sm items-end'>
                  <span>{comment.city?.substring(0, comment.city.length - 1) || "未知"}</span>
                  <span>{convertISOToLocalDateTime(comment.created_at,'Asia/Shanghai')}</span>
                </div>
              </div>

              {/* Comment Content */}
              <div className="chat-bubble px-2 rounded-lg text-sm sm:text-base my-1">
                {comment.body}
              </div>

              {/* Time + Platform Info */}
              <div className="text-xs flex items-center gap-1 sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-primary p-6 rounded-lg shadow-md w-[90%] sm:w-[75%] md:w-[50%] lg:w-[40%]">
              <UserInfoForm onSubmit={handleSubmit} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
