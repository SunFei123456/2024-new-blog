import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import naturalTheme from "@/assets/natural.webp";
import movie from "@/assets/movie.webp";
import city from "@/assets/city.webp";
import "../common/customize.css";

export default function Modal({ visible, onClose, setSiteBgUrl, isBgMode,backDefaultThemeMode }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (visible) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [visible]);
  // 准备一下图片的数据 数组 三个
  const images = [
    { id: 0, src: naturalTheme, alt: "自然气息", thmem: "natural_scent" },
    { id: 1, src: movie, alt: "落日海峡", thmem: "ocean_scent" },
    { id: 2, src: city, alt: "城市行人", thmem: "city_scent" },
  ];

  // 图片压缩



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
            <span className="text-xl text-black font-bold">站点配置</span>
            {/* 自定义站点背景图 预设 */}
            <div className="theme-config">
              <div className="text-base !text-black font-semibold flex gap-1">
                <span className="w-2 bg-primary"></span>
                主题选择
              </div>
              <div className="image-gallery mt-4 flex justify-around gap-1">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="image-item  w-32  flex flex-col items-center  cursor-pointer hover:scale-105 transition-all duration-300"

                    onClick={() => setSiteBgUrl(image.src, image.thmem)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="rounded shadow-md h-full object-cover object-center"
                    />
                    <span className="text-base-300 text-sm">{image.alt}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-base !text-black font-semibold flex flex-col space-y-3">
                <div className="text-base !text-black font-semibold flex gap-1">
                  <span className="w-2 bg-primary "></span>
                  <span>切换色彩和背景主题  </span>
                </div>
                <input
                  type="checkbox"
                  className="toggle toggle-primary ml-3"
                  checked={!isBgMode}
                  onChange={() => backDefaultThemeMode()}
                />

              </div>

            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={onClose}>
                Close
              </button>
            </div>
          </motion.div>
        </dialog>
      )}
    </AnimatePresence>
  );
}

