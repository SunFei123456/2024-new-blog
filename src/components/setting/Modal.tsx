import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import naturalTheme from "@/assets/natural.webp";
import movie from "@/assets/movie.webp";
import city from "@/assets/city.webp";
import morning_fog_scent from '@/assets/hobbit.jpg'
import "../common/customize.css";
import douyin from '@/assets/douyin.svg';
import { startScheduledPush, stopScheduledPush } from "@/apis";  // 导入 API 调用函数
import { X, Link } from 'react-feather'

export default function Modal({ visible, onClose, setSiteBgUrl, isBgMode, backDefaultThemeMode, changeFont, curfont }) {
  // PC端壁纸数组
  const pcWallpapers = [
   "https://www.sunfei.site/static/image/pc1.webp",
   "https://www.sunfei.site/static/image/pc2.webp",
   "https://www.sunfei.site/static/image/pc3.webp",
  ];

  // 移动端壁纸数组
  const mobileWallpapers = [
    "https://www.sunfei.site/static/image/mobile1.webp",
    "https://www.sunfei.site/static/image/mobile2.webp",
    "https://www.sunfei.site/static/image/mobile3.webp",
  ];

  // 随机选择PC端壁纸链接
  const setRandomPcWallpaper = () => {
    const randomPcLink = pcWallpapers[Math.floor(Math.random() * pcWallpapers.length)];
    setExternalImageLink(randomPcLink);
  };

  // 随机选择移动端壁纸链接
  const setRandomMobileWallpaper = () => {
    const randomMobileLink = mobileWallpapers[Math.floor(Math.random() * mobileWallpapers.length)];
    setExternalImageLink(randomMobileLink);
  };
  const dialogRef = useRef(null);
  // 自定义背景图片的url
  const [externalImageLink, setExternalImageLink] = useState<string | null>(null);

  // 用于表示是否订阅了抖音热点推送
  const [isSubscribed, setIsSubscribed] = useState(false);

  // 在组件挂载时，从 localStorage 读取订阅状态
  useEffect(() => {
    const storedSubscriptionStatus = localStorage.getItem('douyinSubscribed');
    if (storedSubscriptionStatus) {
      setIsSubscribed(JSON.parse(storedSubscriptionStatus)); // 从字符串解析为布尔值
    }
  }, []);

  useEffect(() => {
    if (dialogRef.current) {
      if (visible) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [visible]);

  // 点击切换按钮的处理函数
  const handleToggleSubscription = async () => {
    try {
      if (isSubscribed) {
        await stopScheduledPush(); // 停止推送
      } else {
        await startScheduledPush(); // 启动推送
      }
      const newSubscriptionStatus = !isSubscribed;
      setIsSubscribed(newSubscriptionStatus); // 更新订阅状态
      localStorage.setItem('douyinSubscribed', JSON.stringify(newSubscriptionStatus)); // 将订阅状态保存到 localStorage
    } catch (error) {
      console.error("Failed to toggle subscription:", error);
    }
  };

  const images = [
    { id: 0, src: naturalTheme, alt: "自然气息", theme: "natural_scent" },
    { id: 1, src: movie, alt: "落日海峡", theme: "ocean_scent" },
    { id: 2, src: city, alt: "城市行人", theme: "city_scent" },
    { id: 3, src: morning_fog_scent, alt: "晨雾", theme: "morning_fog_scent" }
  ];

  const fonts = [
    { id: 0, name: "宋体", value: "宋体" },
    { id: 1, name: "微软雅黑", value: "微软雅黑" },
    { id: 2, name: "楷体", value: "楷体" },
    { id: 3, name: "像素风", value: "像素风" }
  ];
  const saveExternalImageLink = () => {
    if (externalImageLink) {
      setSiteBgUrl(externalImageLink, 'dracula');
      setExternalImageLink(null);
    } else {
      alert('请输入正确的链接')
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <dialog ref={dialogRef} className="modal">
          <motion.div
            className="modal-box w-5xl hiddenScrollbar space-y-3"
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ type: "spring", duration: 0.2 }}
          >
            <div className="w-full flex justify-between">
              <span className="text-xl  font-bold">站点配置</span>
              <X className="cursor-pointer" color="black" onClick={onClose} ></X>
            </div>

            {/* 自定义站点背景图 预设 */}
            <div className="theme-config">
              <div className="text-base  font-semibold flex gap-1">
                <span className="w-2 bg-primary"></span>
                主题选择
              </div>
              <div className="image-gallery mt-4 flex justify-around gap-1">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="image-item w-32 flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300"
                    onClick={() => setSiteBgUrl(image.src, image.theme)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="rounded shadow-md h-full object-cover object-center"
                    />
                    <span className="text-sm font-[500]" >{image.alt}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* 自定义图片, 输入url */}
            <div className="image-config">
              <div className="text-base font-semibold flex gap-1">
                <span className="w-2 bg-primary"></span>
                自定义图片
                <button className="btn btn-primary btn-xs" onClick={setRandomPcWallpaper}>随机PC端</button>
                <button className="btn btn-primary btn-xs" onClick={setRandomMobileWallpaper}>随机mobile端</button>
              </div>
              <label className="flex justify-between input input-bordered items-center gap-2 h-10 ml-3 mt-3">
                <div className="flex items-center gap-2 w-[82%]">
                  <Link size={15} className="text-primary" />
                  <input
                    type="text"
                    className="text-sm w-[90%] text-black"
                    placeholder="自定义图片的url"
                    value={externalImageLink}
                    onChange={(e) => setExternalImageLink(e.target.value)}
                    // 取消自动聚焦
                    autoFocus={false}
                  />
                </div>
                <button className="w-[18%] text-primary" onClick={saveExternalImageLink}>
                  保存
                </button>
              </label>
            </div>


            {/* 切换图片背景主题 和 默认色彩主题 */}
            <div className="toggle-theme">
              <div className="text-base  font-semibold flex flex-col space-y-3">
                <div className="text-base  font-semibold flex gap-1">
                  <span className="w-2 bg-primary"></span>
                  <span>切换色彩和背景主题</span>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary ml-3"
                  checked={!isBgMode}
                  onChange={() => backDefaultThemeMode()}
                />

              </div>
            </div>

            {/* 站点字体选择 */}
            <div className="fonts-config">
              <div className="text-base  font-semibold flex gap-1">
                <span className="w-2 bg-primary"></span>
                站点字体
              </div>
              <div className="font-gallery mt-4 flex justify-around gap-1">
                {fonts.map((font) => (
                  <div
                    key={font.id}
                    className={`bg-[#000000] font-item w-32 h-8 flex flex-col items-center justify-center rounded-md cursor-pointer ${font.value === curfont ? '!bg-[#ff7500]' : ''}`}
                    onClick={() => changeFont(font.value)}
                  >
                    <span
                      className="text-sm !text-white"
                      style={{ fontFamily: font.value }}
                    >
                      {font.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 订阅设置 */}
            <div className="subscribed-config">
              <div className="text-base  font-semibold flex gap-1">
                <span className="w-2 bg-primary"></span>
                热点消息订阅推送
              </div>
              <div className="font-gallery mt-4 flex justify-start items-end gap-1">
                <img
                  src={douyin}
                  alt="douyin"
                  className={`w-10 ml-3 ring ring-offset-2 rounded-full cursor-pointer ${isSubscribed ? "ring-primary" : "ring-gray-400"
                    }`}
                  onClick={handleToggleSubscription} // 点击触发订阅状态的切换
                />
                <input
                  type="checkbox"
                  className="toggle toggle-primary ml-3"
                  checked={isSubscribed}
                  onChange={handleToggleSubscription} // 切换订阅状态
                />
                <span className="text-sm">开启订阅推送,站点将会间隔60s进行消息的推送,暂时不支持更改.</span>
              </div>
            </div>


          </motion.div>
        </dialog>
      )}
    </AnimatePresence>
  );
}
