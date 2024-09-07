/*
 * @Author: 孙飞
 * @Date: 2024-09-05 21:28:21
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-05 21:31:51
 * @Description: 获取宝藏网站(各个模块下)~
 */

import request from "@/servers";

// 根据类别参数获取网站信息列表
export const getWebsiteByCategory = (category: string) => {
    return request({
        url: `/website/${category}`,
        method: "get",
    });
};