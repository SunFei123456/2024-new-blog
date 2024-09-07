// 抖音热点接口
// export const douyinUrl = "https://aweme.snssdk.com/aweme/v1/hot/search/list/";
export const douyinUrl = "https://api-hot.efefee.cn/douyin?cache=true";

// Bilibili 热点接口
// export const bilibiliUrl = "https://api.bilibili.com/x/web-interface/ranking/v2";
export const bilibiliUrl = "https://api-hot.efefee.cn/bilibili?cache=true";

// 快手热点接口
// export const kuaishouUrl = "https://www.kuaishou.com/?isHome=1"
// export const kuaishouUrl = "https://www.kuaishou.com/?isHome=1"

// 掘金热点接口
// export const juejinUrl = "https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot"
export const juejinUrl = "https://api-hot.efefee.cn/juejin?cache=true";

// 微博热点接口
// export const weiboUrl = "https://weibo.com/ajax/side/hotSearch"
export const weiboUrl = "https://api-hot.efefee.cn/weibo?cache=true";

// 微信读书
export const weixinReadUrl = "https://api-hot.efefee.cn/weread?cache=true";

// 获取抖音数据
export async function fetchData(url: string) {
  const response = await fetch(url); // 替换为实际的 URL
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}
