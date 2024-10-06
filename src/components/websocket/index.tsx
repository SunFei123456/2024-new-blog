import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // 引入Framer Motion
import douyin from '@/assets/douyin.svg'; // 导入您的图片路径
const WebSocketComponent = () => {
  const [currentMessage, setCurrentMessage] = useState(null); // 存储当前的消息

  useEffect(() => {
    let ws: WebSocket;

    // 创建 WebSocket 连接
    const connectWebSocket = () => {
      ws = new WebSocket('wss://www.sunfei.site/api/v1/ws'); // 替换为您的 WebSocket 服务器地址

      // 处理连接打开事件
      ws.onopen = () => {
      };

      // 处理接收到消息事件
      ws.onmessage = (event) => {
        const newMessage = event.data; // 获取消息内容
        showAlert(newMessage); // 每次接收到消息时展示alert
      };

      // 处理连接关闭事件
      ws.onclose = () => {
        setTimeout(connectWebSocket, 3000); // 3秒后重连
      };

      // 处理错误事件
      ws.onerror = (error) => {
        console.error('WebSocket 发生错误:', error);
      };
    };

    // 显示Alert的函数
    const showAlert = (message: any) => {
      setCurrentMessage(message); // 更新当前消息

      // 10s后移除消息
      setTimeout(() => {
        setCurrentMessage(null); // 清空当前消息
      }, 10000);
    };

    // 连接 WebSocket
    connectWebSocket();

    // 清理函数，组件卸载时关闭连接
    return () => {
      if (ws) {
        ws.close(); // 关闭 WebSocket 连接
      }
    };
  }, []);

  function extractURL(text: string) {
    // 定义正则表达式匹配 URL
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    // 使用正则表达式查找 URL
    const result = text.match(urlPattern);
    // 返回第一个匹配到的 URL 或 null
    return result ? result[0] : null;
  }

  return (
    <div className="relative">

      {/* Alert 弹出框 */}
      <div className="fixed top-1 right-1 z-50 w-80 lg:w-1/2 ">
        <AnimatePresence>
          {currentMessage && (
            <motion.div
              key={currentMessage}
              initial={{ opacity: 0, translateX: 100 }} // 从右侧（100px外）开始
              animate={{ opacity: 1, translateX: 0 }}   // 向左弹出至原位
              exit={{ opacity: 0, translateX: 100 }}    // 从左向右收回
              transition={{ type: 'spring', stiffness: 300, damping: 20 }} // 弹簧效果
              className="bg-primary text-white flex items-start space-x-3 px-4 py-2 cursor-pointer rounded shadow-lg"
              onClick={() => window.open(extractURL(currentMessage), '_blank')}
            >
              <img src={douyin} className='w-10' alt="" />
              <span className='text-xs lg:text-lg'>{currentMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WebSocketComponent;
