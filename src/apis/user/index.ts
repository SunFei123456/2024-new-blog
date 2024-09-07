import request from "@/servers";

// 获取用户的信息
export const getUserInfo = () => {
  return request({
    url: "/user/info",
    method: "get",
  });
};


// 获取用户发表的