/*
 * @Author: 孙飞
 * @Date: 2024-09-06 16:20:02
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-06 21:25:10
 * @Description: 热点滚动列表~
 */
import React from 'react';
import { RefreshCcw } from "react-feather"
const ScrollList = ({ data, logo, className = "" }) => {
  return (
    <div className={`p-4 rounded-lg shadow h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-300">
        <div className="flex items-center">
          <img src={logo} alt="avatar" className="w-8 h-8 rounded-lg" />
          <span className="ml-2 text-sm font-bold">{data && data.title}</span>
        </div>
        <span className="text-xs font-medium text-gray-500">
          {data && data.description}
        </span>
        <button className="flex items-center bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">
          {data && data.type}
        </button>
      </div>

      {/* Scrollable list */}
      <div className="max-h-96 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {data.data.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-2 cursor-pointer"
            onClick={() => window.open(item.url)}
          >
            <div className="flex items-center">
              <span
                className={`w-6 h-6 text-center rounded-full font-bold text-white mr-2 ${
                  index === 0
                    ? 'bg-red-500'
                    : index === 1
                    ? 'bg-orange-500'
                    : index === 2
                    ? 'bg-yellow-500'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {index + 1}
              </span>
              <span className="text-sm">{item.title}</span>
            </div>
            <span className="text-xs text-gray-500">{item.hot}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-400 mt-2">
        <span>16 分钟前更新</span>
        <div className="flex items-center">
          <button className="mr-2">
            <RefreshCcw size={16} />
          </button>
          <button>
            <i className="fas fa-share-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
};


export default ScrollList;
