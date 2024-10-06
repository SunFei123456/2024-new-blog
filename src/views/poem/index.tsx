import PoemCardPlane from '@/components/poem/PoemCard';
import React from 'react';
import { ArrowRight } from 'react-feather';
import { useToggle } from 'ahooks';
import Drawer from '@/components/common/Drawer';


export default function Poem() {
  // useToggle to manage the modal's visibility state
  const [isShowDrawer, { toggle }] = useToggle(false);


  return (
    <div>
      {/* 抽屉 */}
      <Drawer visible={isShowDrawer} onClose={toggle}  >
        <div className='space-y-4 drawer-text'>
          <h2 className="text-lg font-bold mb-3">我的诗</h2>
          <p className="text-sm ">大概很久之前,我就喜欢上了使用诗歌文字来表达自己的情绪,依稀记得在上学时候,我经常吃完晚饭躺在操场上面仰望着天空</p>
          <p className="text-sm ">思索着什么</p>
          <p className="text-sm ">常常一个人的发呆,就会想很多,经常性地想到了一些充满当时心境的语句,便会立刻记录下来.</p>

          <p className='text-sm font-bold text-primary'>之所以开设这个模块</p>

          <p className="text-sm ">就是想要把之前写过的以及之后要写放入在这个模块里面,充当一个云存储库的作用.</p>


          <p className='text-sm font-semibold text-orange-400'>行进在实现梦想的旅途中，是一种幸福。无论沿途遇到什么风景，只要不停下脚步，继续奔走在自己的热爱里，人生终将变得美好而辽阔。
          </p>
        </div>
      </Drawer>


      {/* PoemCardPlane */}
      <div className="p-3">
        <PoemCardPlane />
      </div>

      {/* 按钮 --> 呼出抽屉 */}
      <button
        className="flex items-center justify-between px-2  h-[2.2rem] rounded-md fixed bottom-5 left-5 cursor-pointer bg-base-500 hover:bg-violet-600"
        onClick={toggle}
        aria-label="Toggle menu"
      >
        {/* <span className="text-white text-sm">弹出菜单</span> */}
        <ArrowRight size={20} color='white' />
      </button>
    </div>
  );
}
