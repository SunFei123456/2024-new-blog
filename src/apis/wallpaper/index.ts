
// 获取随机壁纸 bing

import request from "@/servers/index";

export const getWallpaper = () => {
    return request({
        url: "/bing_wallpaper",
        method: "get",
    });
}