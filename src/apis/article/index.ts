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

