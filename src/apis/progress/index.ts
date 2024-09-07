// 获取进度记录列表

import request from "@/servers";

// 获取进度记录列表
export const getProgressList = () => {
    return request({
        url: "/progress/list",
        method: "get",
    });
}