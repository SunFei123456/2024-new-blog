import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// 创建 axios 实例
const request = axios.create({
  // 基础 URL
  baseURL: "http://localhost:8080/api/v1", // 后端接口的基础 URL
  // 请求超时时间
  timeout: 10000,
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("token");
    if (token) {
      // 添加 Authorization 头部
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // 添加其他头部信息（如 Content-Type）
    config.headers["Content-Type"] = "application/json;charset=utf-8";
    return config;
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 处理响应数据
    const { data, status, statusText } = response;
    // 根据状态码进行处理
    if (status >= 200 && status < 300) {
      return data;
    } else {
      // 处理异常状态码
      throw new Error(`${status} ${statusText}`);
    }
  },
  (error) => {
    // 处理响应错误
    const { response } = error;
    if (response) {
      // 处理异常状态码
      throw new Error(`${response.status} ${response.statusText}`);
    } else {
      // 处理网络错误
      throw new Error("Network Error");
    }
  }
);

// 导出 request 实例
export default request;