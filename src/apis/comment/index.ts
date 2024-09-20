import request from "@/servers";
// 创建一条评论
export const createCommentApi = (data: any) => {
  return request({
    url: "/comment/create",
    method: "post",
    data,
  });
};

// 根据评论类型获取评论列表
export const getCommentListApi = (commentable_type:string,page:number) => {
  // http://127.0.0.1:8080/api/v1/comment/feedback/list?page=1
  return request({
    url: `/comment/${commentable_type}/list?page=${page}`,
    method: "get",
  });
};
