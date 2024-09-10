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
      <Drawer visible={isShowDrawer} onClose={toggle} >
        <h2 className="text-lg font-bold">抽屉内容</h2>
        <p>这里是一些内容...</p>
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
