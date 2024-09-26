/*
 * @Author: 孙飞
 * @Date: 2024-09-04 19:00:37
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-05 21:53:58
 * @Description: 网站信息卡片 --> 归属于plane面板展示~
 */
import React,{useState} from "react";

const WebsiteInfoCard = ({ logo, name, desc, href }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div
      className="w-full lg:w-[20rem] h-22 flex items-center gap-4 p-3 rounded-md bg-base-300 shadow-md cursor-pointer hover:bg-base-200 transition-colors duration-300"
      onClick={() => window.open(href, "_blank")}
    >
      <div className="flex items-center">
            {!imgError ? (
                <img 
                    className="w-14 h-14 rounded-full object-cover" 
                    src={logo} 
                    alt={`${name}'s icon`} 
                    onError={() => setImgError(true)}
                    loading="lazy" 
                />
            ) : (
                <div className="w-14 h-14 rounded-md bg-base-100 text-xs p-2 text-center truncate line leading-10">
                    {name}
                </div>
            )}
        </div>
      {/* 文本内容 */}
      <div className="w-[60%] font-medium">
        <div className="text-lg font-semibold line-clamp-1">{name}</div>
        <div className="text-xs  line-clamp-2">
          {desc}
        </div>
      </div>
    </div>
  );
};

export default WebsiteInfoCard;
