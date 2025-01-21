import Taro from "../../node_modules/@tarojs/taro";
const baseUrl = "http://localhost:7001";
const request = ({ url, method = "GET", data = {} }) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: baseUrl + url,
      method: method,
      data: data,
      success: (res) => {
        resolve(res.data);
      },
    });
  });
};
console.log(Taro);

const requestInterceptor = (chain) => {
  const requestParams = chain.requestParams;
  const { method, data, url } = requestParams;
  const token = Taro.token;
  if (token) {
    requestParams.header = {
      ...requestParams.header,
      Authorization: `Bearer ${token}`,
    };
  }

  return chain.proceed(requestParams).then((res) => {
    console.log(`http <-- ${url} result:`, res);
    return res;
  });
};

// 定义一个响应拦截器
const resonseInterceptor = (chain) => {
  return chain.proceed().then((res) => {
    console.log(`http --> ${chain.requestParams.url} result:`, res);
    return res;
  });
};

Taro.addInterceptor(requestInterceptor);
Taro.addInterceptor(resonseInterceptor);

export default request;
