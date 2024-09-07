/*
 * @Author: 孙飞
 * @Date: 2024-09-06 15:59:32
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-06 22:48:45
 * @Description: 做好每一件小事~
 */
import React from 'react';
import { useRequest } from 'ahooks';
import ScrollList from '@/components/hot-topic/ScrollList';
import { bilibiliUrl, douyinUrl, fetchData, juejinUrl, weiboUrl, weixinReadUrl } from '@/apis/hot_topic/index';

import douyin from '@/assets/douyin.svg';
import bilibili from '@/assets/bilibili.svg';
import weibo from '@/assets/weibo.svg'
import juejin from '@/assets/juejin.svg'
import weread from '@/assets/weread.svg'


export default function HotTopic() {
  const fetchAllData = async () => {
    const [douyinResponse, biliResponse, webResponse, juejinResponse, wxReadResponse] = await Promise.all([
      fetchData(douyinUrl),
      fetchData(bilibiliUrl),
      fetchData(weiboUrl),
      fetchData(juejinUrl),
      fetchData(weixinReadUrl),
    ]);
    return { douyinData: douyinResponse, biliData: biliResponse, webData: webResponse, juejinData: juejinResponse, wxReadData: wxReadResponse };
  };

  const { data, loading, error } = useRequest(fetchAllData);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-6'>
      <ScrollList data={data.douyinData} logo={douyin} />
      <ScrollList data={data.biliData} logo={bilibili} />
      <ScrollList data={data.webData} logo={weibo} />
      <ScrollList data={data.juejinData} logo={juejin} />
      <ScrollList data={data.wxReadData} logo={weread} className="md:col-span-2" />
    </div>
  );
}
