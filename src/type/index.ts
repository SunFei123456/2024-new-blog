// 一个用户的基本的信息
export interface BaseUserType {
  id: number;
  nickname: string;
  avatar: string;
  address: string;
}

// 一篇文章的类型(附带作者信息)
export interface ArticleType {
  id: number;
  title: string;
  content: string;
  coverImage: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  user: BaseUserType;
  views: number;
}

// 响应Response的类型
export interface ResponseType<T> {
  code: number;
  data: T;
  msg: string;
}

// 文章模块的数据统计
export type ArticleStatisticsType = {
  article_total: number;
  views_total: number;
  category_total: number;
};
