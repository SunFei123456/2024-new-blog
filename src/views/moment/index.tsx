import React from 'react'
import { ArrowRight } from 'react-feather'

export default function Moment() {
    return (
        <div className="relative flex flex-col gap-6 bg-cover bg-center">
            {/* 背景模糊层 */}
            <div className="absolute inset-0 bg-[url('/src/assets/hobbit.jpg')] bg-cover bg-center filter blur-lg"></div>
            {/* 渐变 */}
            <div className='z-10 w-full h-32 rounded-2xl'>
                <div className='w-full h-full flex items-center justify-center text-[1.2rem] sm:text-[1.6rem] font-bold text-white'>
                    Nice to meet you
                </div>
            </div>

            {/* 第一行内容 */}
            <div className='z-10 w-full h-52 flex gap-6 justify-between flex-col sm:flex-row'>
                <div className='w-full sm:w-3/5 h-[100%] flex justify-between bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white rounded-2xl'>
                    <div className='flex flex-col justify-between space-y-2'>
                        <div className='space-y-2'>
                            <span className="text-sm sm:text-base">Intruduction</span>
                            <div className='text-base sm:text-xl'>孙飞</div>
                            <div className='text-sm sm:text-xl'>全栈开发 主前端Vue 后端Go 正在学习中 </div>
                        </div>
                        <div className='text-xs'>喜欢白天做梦,晚上睡觉,触摸梦幻般的泡沫</div>
                    </div>
                    <img src="/src/assets/work.gif" alt="" className='w-26 hover:scale-125 duration-300 transition-all ease-in-out ' />
                </div>
                <div className='w-full sm:w-2/5 h-[100%] bg-blue-400 rounded-2xl mt-4 sm:mt-0'>
                    <div className='w-full h-full flex items-center justify-center text-[1.2rem] sm:text-[1.6rem] font-bold text-white'>
                        时人不识凌云木，直待凌云始道高。
                    </div>
                </div>
            </div>

            {/* 第二行内容 */}
            <div className='z-10 w-full  flex gap-6 justify-between flex-col sm:flex-row'>
                <div className="w-full sm:w-1/4 h-96 relative flex flex-col items-center justify-around rounded-2xl p-6 bg-[url('/src/assets/123.jpg')] bg-cover bg-center">
                    <div className="text-xs sm:text-base text-white absolute top-6 right-6">
                        <div>斗罗大陆</div>
                        <div>完美世界</div>
                        <div>仙逆</div>
                        <div>练气十万年</div>
                        <div>斩神之凡尘神域</div>
                        <div>剑来</div>
                        <div>斗破苍穹</div>
                        <div>不良人系列</div>
                    </div>
                </div>
                <div className="w-full sm:w-3/4 h-96 relative rounded-2xl bg-[url('/src/assets/tsxk.jpg')] bg-cover bg-center">
                    <div className='flex flex-col space-y-4 items-end absolute right-10 top-4'>
                        <span className="text-sm font-bold text-white-500">最喜欢的动漫</span>
                        <span className='text-xl sm:text-3xl font-bold text-white'>吞噬星空</span>
                    </div>
                    <div className='flex items-center space-x-2 absolute right-10 bottom-4 cursor-pointer'>
                        <span className="text-xs sm:text-sm font-bold text-white hover:text-red-500">
                            <a href="https://v.qq.com/x/cover/324olz7ilvo2j5f/i00350r6rf4.html" target="_blank">前去观看</a>
                        </span>
                        <ArrowRight size={20} color='white' />
                    </div>
                </div>
            </div>

            {/* 第三行内容 */}
            <div className='z-10 w-full h-auto flex gap-6 justify-around flex-col sm:flex-row'>
                <div className='w-full sm:w-2/4 h-96  flex flex-col justify-between bg-[url("/src/assets/music.jpg")] bg-center bg-cover rounded-2xl p-6'>
                    <div className='text-blue-200 text-lg sm:text-xl font-bold mb-6'>我的听歌偏好</div>
                    <div className='flex flex-col space-y-1'>
                        <span className='text-xs sm:text-slate-400'>曲风</span>
                        <span className='text-lg sm:text-xl text-white font-medium'>民谣,流行,摇滚</span>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <span className='text-xs sm:text-slate-400'>最喜欢的歌曲</span>
                        <span className='text-lg sm:text-xl text-white font-medium'>老街</span>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <span className='text-xs sm:text-slate-400'>喜欢的歌手</span>
                        <span className='text-lg sm:text-xl text-white font-medium'>李荣浩,周杰伦,薛之谦,许嵩,陈鸿宇,</span>
                    </div>
                </div>
                <div className='w-full sm:w-2/4 h-96  flex flex-col justify-between bg-[url("/src/assets/movie.webp")] bg-center bg-cover rounded-2xl p-6'>
                    <div className='text-blue-200 text-lg sm:text-xl font-bold mb-6'>我的影视偏好</div>
                    <div className='flex flex-col space-y-1'>
                        <span className='text-xs sm:text-slate-400'>风格</span>
                        <span className='text-lg sm:text-xl text-white font-medium'>戏剧,动作,科幻,战争,警匪等等</span>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <span className='text-xs sm:text-slate-400'>推荐的一部电影</span>
                        <span className='text-lg sm:text-xl text-white font-medium'>《少年派的奇幻漂流》</span>
                    </div>
                    <div className='flex flex-col space-y-1'>
                        <span className='text-xs sm:text-slate-400'>喜欢的系列电影有</span>
                        <span className='text-lg sm:text-xl text-white font-medium'>漫威,悬疑,007,变形金刚</span>
                    </div>
                </div>
            </div>

            {/* 第四行内容 */}
            <div className='z-10 w-full h-[30rem] flex gap-6 justify-between flex-col sm:flex-row'>
                <div className="w-full sm:w-3/4 h-[100%] bg-[url('/src/assets/hobbit.jpg')] bg-cover bg-center rounded-2xl p-6">
                    <div className='text-lg sm:text-xl text-white font-bold'>业余爱好</div>
                    <div className='w-full h-full mt-[10%] text-xs sm:text-lg text-center text-white mx-auto'>
                        爬山 计划 旅游 写文章.
                    </div>
                </div>
                <div className='w-full sm:w-1/4 h-[100%] bg-slate-400 rounded-2xl p-6'>
                    <div className='text-lg sm:text-xl text-white font-bold'>个人性格</div>
                    <div className='flex items-end ml-4'>
                        <a href="https://www.16personalities.com/ch/infp-%E4%BA%BA%E6%A0%BC" target='_blank'>
                            <img src="/src/assets/1.svg" alt="" className='w-80 h-80 hover:scale-110 cursor-pointer duration-300 transition-all' />
                        </a>
                        <div className='text-xs sm:text-xl text-white font-bold'>INSP</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
