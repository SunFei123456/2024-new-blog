/*
 * @Author: 孙飞
 * @Date: 2024-09-07 21:56:15
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-07 22:27:59
 * @Description: 抽屉组件~
 */
import React from 'react';



import { X } from "react-feather"


const Drawer = ({ visible, onClose, children }) => {
  return (
    <div className={`fixed inset-0 z-50 transition-transform duration-300 ${visible ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="drawer-overlay fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="drawer-content bg-base-100 w-80 h-full shadow-lg transform transition-transform duration-300">
        <button className="p-2" onClick={onClose}><X></X></button>
        <div className="p-4">
          {children}
        </div>
        {/* 底部一个按钮 用于收回 */}
        <button className='w-[85%] btn btn-primary absolute bottom-5  left-5'
          onClick={onClose}
        >收回</button>
      </div>

    </div>
  );
};

export default Drawer;
