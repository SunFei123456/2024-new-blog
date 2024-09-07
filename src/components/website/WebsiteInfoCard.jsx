/*
 * @Author: 孙飞
 * @Date: 2024-09-04 19:00:37
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-05 21:53:58
 * @Description: 网站信息卡片 --> 归属于plane面板展示~
 */
import React from "react";

const WebsiteInfoCard = ({ icon, name, desc, href }) => {
  return (
    <div
      className="w-[20rem] h-22 flex items-center gap-4 p-3 rounded-md bg-base-300 shadow-md cursor-pointer hover:bg-base-200 transition-colors duration-300"
      onClick={() => window.open(href, "_blank")}
    >
      {/* 图片部分 */}
      {/* <img className="w-14 h-14 rounded-full object-cover" src={icon} alt={`${name}'s icon`} /> */}
      <div className="w-[20%] h-14 rounded-md bg-base-100 text-xs p-2 text-center truncate line leading-10">{name}</div>

      {/* 文本内容 */}
      <div className="w-[60%] font-medium dark:text-white">
        <div className="text-lg font-semibold line-clamp-1">{name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400  line-clamp-2">
          {desc}
        </div>
      </div>
    </div>
  );
};

export default WebsiteInfoCard;
