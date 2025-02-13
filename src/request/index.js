import Taro from "../../node_modules/@tarojs/taro";
import { refreshAccessToken } from "../api/user";
const baseUrl = "http://localhost:7001";
// const baseUrl = "http://192.168.185.138:3000";

const request = ({ url, method = "GET", data = {} }) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: baseUrl + url,
      method,
      data,
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        console.log(err);
      }
    });
  });
};


const requestInterceptor = (chain) => {
  const requestParams = chain.requestParams;
  const { method, data, url } = requestParams;
  const token = Taro.getStorageSync("token");
  const refreshToken = Taro.getStorageSync("refreshToken");

  if (token) {
    requestParams.header = {
      ...requestParams.header,
      Authorization: `${token}`,
      refreshToken: `${refreshToken}`,
    };
  }
  return chain.proceed(requestParams).then((res) => {
    return res;
  })
};

// 定义一个响应拦截器
const resonseInterceptor = (chain) => {
  const { requestParams } = chain;
  return chain.proceed(requestParams).then(async (res) => {
    const refreshToken = Taro.getStorageSync("refreshToken");
    if (res.data.code === 401 && !requestParams.url.includes('/refresh') && refreshToken) {
      const newRes = await refreshAccessToken();
      if (newRes.code === 200) {
        const newToken = newRes.token;
        Taro.setStorageSync("token", newToken);
        requestParams.header.Authorization = newToken;
        const data = await Taro.request(requestParams)
        console.log(data, '重新请求data');
        return data
      }
    }
    return res;
  });
};

Taro.addInterceptor(requestInterceptor);
Taro.addInterceptor(resonseInterceptor);

export default request;
