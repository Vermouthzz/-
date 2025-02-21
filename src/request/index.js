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
        reject(err);
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
    };
  }
  if (refreshToken) {
    requestParams.header = {
      ...requestParams.header,
      cookie: `${refreshToken}`,
    };
  }
  return chain.proceed(requestParams).then((res) => {
    return res;
  })
};

// 定义一个响应拦截器
const resonseInterceptor = (chain) => {
  console.log('响应拦截器', chain);

  const { requestParams } = chain;
  return chain.proceed(requestParams).then(async (res) => {
    if (res.statusCode === 200 && requestParams.url.includes('/login')) {
      const cookie = res.cookies[0];
      const refreshToken = cookie.split("=")[1].split(";")[0];
      Taro.setStorageSync("refreshToken", refreshToken);
    }
    if (res.data.code === 401 && !requestParams.url.includes('/refresh') && requestParams.header.cookie) {
      const newRes = await refreshAccessToken();
      console.log(newRes, 'newRes');

      if (newRes.code === 200) {
        const newToken = newRes.token;
        Taro.setStorageSync("token", newToken);
        requestParams.header.Authorization = newToken;
        const data = await Taro.request(requestParams)
        console.log(data, '重新请求data');
        return data
      }
    }
    if (res.data.code === 400) {
      Taro.setStorageSync("token", '');
      Taro.removeStorageSync("userInfo");
    }
    return res;
  });
};

Taro.addInterceptor(requestInterceptor);
Taro.addInterceptor(resonseInterceptor);

export default request;
