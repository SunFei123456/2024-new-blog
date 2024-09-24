import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // 后端接口的基础 URL
  timeout: 50000, // 请求超时时间
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
    const { data, status } = response;
    if (status >= 200 && status < 300) {
      return data;
    } else {
      throw new Error(`${status} ${response.statusText}`);
    }
  },
  (error) => {
    const { response } = error;
    if (response) {
      return Promise.reject(response.data); // 直接返回错误响应数据
    } else {
      return Promise.reject(new Error("Network Error"));
    }
  }
);

// 导出 request 实例




 
export default request;
