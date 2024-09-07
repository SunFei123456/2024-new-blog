/*
 * @Author: 孙飞
 * @Date: 2024-09-04 16:32:55
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-04 16:50:15
 * @Description: ISO标准时间格式化 为 2024-09-04 16:32:55~
 */

// 格式化完整的日期和时间
export const formatDateTime = (isoString: string): string => {
    console.log(isoString);
    
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 格式化日期为 年月日
export const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
