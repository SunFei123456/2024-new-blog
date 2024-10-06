import React, { useState, useEffect } from 'react';
import Pagination from './Pagination'; // Assume you have a Pagination component
import { convertISOToLocalDateTime, parseUserAgent } from '@/tools/index'; // Assume you have utility functions
import UserInfoForm from './UserInfoFormModel';
import Alert from './Alert';
import { createCommentApi, getArticleCommentListApi } from '@/apis';

interface CommentProps {
  initialCommentList: any[];
  pageId: string;
}

const Comment: React.FC<CommentProps> = ({ initialCommentList = [], pageId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [body, setBody] = useState('');
  const [selectedOption, setSelectedOption] = useState('最新');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [isDisabled, setIsDisabled] = useState(true);
  const [commentList, setCommentList] = useState(initialCommentList);
  const [alert, setAlert] = useState<{ type: 'error' | 'warning' | 'success'; message: string } | null>(null);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (data: { avatar: string; nickname: string; webSite: string }) => {

    createCommentApi({
      avatar: data.avatar,
      nickname: data.nickname,
      site: data.webSite,
      body: body,
      commentable_type: 'article', // 根据需求调整
      commentable_id: Number(pageId), // 根据需求调整
    }).then(async (res) => {
      if (res.data.code === 200) {
        setBody('');
        setIsModalOpen(false);
        await getCommentListWithArticle(currentPage); // 刷新评论列表
        setAlert({ type: 'success', message: "评论成功" });
      }
    }).catch((error) => {

      setAlert({ type: 'error', message: error.error.msg });

    })



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
  };

  useEffect(() => {
    getCommentListWithArticle(currentPage);
  }, [currentPage]);

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    setSelectedOption(option);
    // TODO: 根据选择更新评论列表（例如通过排序）
  };

  return (
    <div className='w-full flex flex-col gap-4'>
      {/* 评论输入框 */}
      <div className='w-full  flex flex-col gap-4'>
        <span className='text-lg sm:text-xl lg:text-2xl font-bold'>留下您的评论</span>
        <textarea
          className="w-full p-4 bg-content rounded-lg border placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out resize-none"
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

      {/* 评论列表 */}
      <div className='w-full h-auto flex flex-col space-y-4'>
        {/* 评论数量 + 选择 */}
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
          <div key={comment.id} className=" shadow p-4 rounded-lg flex space-x-4">
            {/* 头像 */}
            <div className="flex-shrink-0">
              <div className="avatar">
                <div
                  className={`ring ring-primary ring-offset-base-100  w-10 rounded-full  transition duration-300 ease-in-out ${comment.site ? 'cursor-pointer hover:ring-orange-500' : 'cursor-default ring ring-gray-500'}`} // 条件样式
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

        {/* 分页 */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}

        {/* 模态框 */}
        {isModalOpen && (
          <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-primary p-6 rounded-lg shadow-md w-[90%] sm:w-[75%] md:w-[50%] lg:w-[40%]">
              <UserInfoForm onSubmit={handleSubmit} onClose={handleCloseModal} />
            </div>
          </div>
        )}
      </div>

      {/* 警报信息 */}
      {alert && (
        <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
      )}
    </div>
  );
};

export default Comment;
