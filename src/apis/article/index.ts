import request from "@/servers";
// 根据category字段值获取文章列表
export const getArticlesByCategoryApi = (category: string) => {
  return request({
    url: `/article/category/${category}`,
    method: "get",
  });
};


// 根据id字段获取指定的文章
export const getArticleByIdApi = (id: string) => {
  return request({
    url: `/article/${id}`,
    method: "get",
  });
}

// 获取最近的文章列表
export const getRecentArticlesApi = () => {
  return request({
    url: `/article/latest`,
    method: "get",
  });
}

// 根据文章类型获取文章列表
export const getArticlesListByCategoryApi = (category: string) => {
  return request({
    // /article/category/:category/list
    url: `/article/category/${category}/list`,
    method: "get",
  });
}

// 获取热门推荐文章列表
export const getHotArticlesApi = () => {
  return request({
    url: `/article/hot`,
    method: "get",
  });
}


//  根据文章的id获取其下的评论列表
export const getArticleCommentListApi = (id: string, page: number) => {
  return request({
    url: `/article/${id}/comments?page=${page}`,
    method: "get",
  });
}


// 增加某个文章的浏览量
// http://127.0.0.1:8080/api/v1/article/15/views
export const increaseArticleViewsApi = (id: string) => {
  return request({
    url: `/article/${id}/views`,
    method: "put",
  });
}

// 获取文章模块下数据统计
// /stats/article
export const getArticleStatsApi = () => {
  return request({
    url: `/stats/article`,
    method: "get",
  });
}