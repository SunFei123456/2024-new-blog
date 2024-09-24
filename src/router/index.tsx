/*
 * @Author: 孙飞
 * @Date: 2024-08-23 23:04:05
 * @LastEditors: 孙飞
 * @LastEditTime: 2024-09-04 18:02:10
 * @Description: react-router 定义
 */
// src/router.ts
import React from 'react';
import {  createHashRouter, RouteObject } from 'react-router-dom';
import Layout from '@/layout/index'; // 导入 Layout 组件
import Home from '@/views/home/index'; // 导入 Home 页面
import NotFound from '@/components/error-components/404'; // 可选：404 页面

import Article from '@/views/article';
import ArticleList from '@/views/article/list';
import ArticleDetail from '@/views/article/details';

import Poem from '@/views/poem';
import HotTopic from '@/views/hot-topic';
import Website from '@/views/website';


import MessageBoard from '@/views/message-board';


import Process from '@/views/process';

import ServiceError from '@/components/error-components/500';

import themeList from '@/theme/theme-config'
import { Navigate } from 'react-router-dom';

import Moment from '@/views/moment';
import CognitiveExpansion from '@/views/cognitive-expansion';
import CognitiveExpansionArticleDetail from '@/views/cognitive-expansion/detail';

// 定义路由对象的类型
const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout themeList={themeList} />, // 使用 Layout 作为根路由的 element
    children: [
      {
        path: '',
        element: <Home />,
      },
      // 朋友圈
      {
        path:'moment',
        element: <Moment />
      },
      // 诗
      {
        path: 'poem',
        element: <Poem />,
      },
      // 认知扩展
      {
        path:"cognitive_expansion",
        element: <CognitiveExpansion />
      },
      // 文章详情
      {
        path: '/cognitive_expansion/article/:id',
        element: <CognitiveExpansionArticleDetail />,
      },
      // 每日热点
      {

        path: 'hotNews',
        element: <HotTopic />
      },

      // 网站
      {
        path: 'website',
        element: <Website />,
      },

      // 文章
      {
        path: 'article',
        element: <Article />,
      },
      {
        path: '/article/:category/list',
        element: <ArticleList />,

      },

      {
        path: 'article/:id',
        element: <ArticleDetail />,
      },
      // 项目进度页面
      {
        path: 'process',
        element: <Process />,

      },
      // 留言板
      {
        path: 'messageBoard',
        element: <MessageBoard />,
      },
      {
        path: '*',
        element: <NotFound />, // 可选：处理未匹配的路由
      },
      // 500

    ],

  },

];

// 创建并导出路由实例
const router = createHashRouter(routes);

export default router;
