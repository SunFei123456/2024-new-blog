import { format, toZonedTime } from 'date-fns-tz';

import Compressor from 'compressorjs';
/**
 * 将 ISO 8601 格式的日期时间字符串转换为指定时区的本地时间字符串。
 * 
 * @param isoString - ISO 8601 格式的日期时间字符串。
 * @param timeZone - 时区字符串，例如 'Asia/Shanghai'。默认为 'UTC'。
 * @returns 转换后的本地时间字符串，格式为 'yyyy-MM-dd HH:mm:ss'。
 */  
export const convertISOToLocalDateTime = (isoString: string, timeZone: string = 'UTC'): string => {
  // 创建 Date 对象
  const date = new Date(isoString);

  // 将 UTC 时间转换为指定时区的时间
  const zonedDate = toZonedTime(date, timeZone);

  // 格式化日期时间（不带时区）
  return format(zonedDate, 'yyyy-MM-dd HH:mm:ss', { timeZone });
};



// 格式化日期为 年月日
export const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};


/**
 * 解析用户代理字符串以提取浏览器和操作系统信息。
 *
 * @param {string} userAgent - 要解析的用户代理字符串。
 * @return {object} 一个包含浏览器版本和操作系统的对象。
 */
export const parseUserAgent = (userAgent) => {
    let browser = '';
    let version = '';
    let os = '';

    // 提取浏览器及版本
    if (userAgent.includes('Chrome')) {
        browser = 'Chrome';
        version = userAgent.match(/Chrome\/([\d.]+)/)[1];
    } else if (userAgent.includes('Firefox')) {
        browser = 'Firefox';
        version = userAgent.match(/Firefox\/([\d.]+)/)[1];
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        browser = 'Safari';
        version = userAgent.match(/Version\/([\d.]+)/)[1];
    } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
        browser = 'Internet Explorer';
        version = userAgent.match(/(MSIE|rv:)([\d.]+)/)[2];
    } else if (userAgent.includes('Edge')) {
        browser = 'Edge';
        version = userAgent.match(/Edge\/([\d.]+)/)[1];
    }

    // 提取操作系统
    if (userAgent.includes('Windows NT 10.0')) {
        os = 'Windows 10';
    } else if (userAgent.includes('Windows NT 6.3')) {
        os = 'Windows 8.1';
    } else if (userAgent.includes('Windows NT 6.1')) {
        os = 'Windows 7';
    } else if (userAgent.includes('Macintosh')) {
        os = 'Mac OS';
    } else if (userAgent.includes('X11')) {
        os = 'Linux';
    } else if (userAgent.includes('Android')) {
        os = 'Android';
    } else if (userAgent.includes('iPhone')) {
        os = 'iOS (iPhone)';
    } else if (userAgent.includes('iPad')) {
        os = 'iOS (iPad)';
    }

    return {
        browserWithVersion: `${browser} ${version}`,
        os: os
    };
}






export const compressImage = async (file: File, quality: number): Promise<File> => {
    return new Promise<File>((resolve, reject) => {
        new Compressor(file, {
            quality: quality,
            success(result) {
                console.log('压缩后图片大小：', result.size);
                resolve(result as File);
            },
            error(err) {
                reject(err);
            },
        });
    });
};