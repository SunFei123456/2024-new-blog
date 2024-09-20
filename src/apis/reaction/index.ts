
// 反应相关的接口

import request from "@/servers";

// 发生or取消反应
// "/reaction/:type/:id/:reaction_type"
export const reactionApi = (type: string, id: number, reaction_type: string) => {
    return request({
        url: `/reaction/${type}/${id}/${reaction_type}`,
        method: "post",
    });
}