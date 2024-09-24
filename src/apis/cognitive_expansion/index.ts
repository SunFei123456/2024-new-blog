import request from "@/servers";

// 根据 ID 获取指定文章
export const getCEArticleByIdApi = (id) => {
  return request({
    url: `/cognitive_expansion/article/${id}`,
    method: "get",
  });
};

// 根据标签获取指定文章列表
export const getCEArticlesByTagApi = (tag) => {
  return request({
    url: `/cognitive_expansion/article/tag`,
    method: "get",
    params: { tag },
  });
};

// 获取所有文章标签
export const getCEAllTagsApi = () => {
  return request({
    url: `/cognitive_expansion/article/tags`,
    method: "get",
  });
};

// 获取最近的10篇文章
export const getCELatestArticlesApi = () => {
  return request({
    url: `/cognitive_expansion/article/latest`,
    method: "get",
  });
};

// 根据标题模糊搜索文章
export const searchCEArticlesByTitleApi = (title) => {
  return request({
    url: `/cognitive_expansion/article/search`,
    method: "get",
    params: { title },
  });
};
