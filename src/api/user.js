import request from "../request";

export const getUserInfoAPI = (params) => {
  return request({
    url: "/user/info",
    method: "GET",
    data: params,
  });
};

export const login = (params) => {
  return request({
    url: "/user/login",
    method: "POST",
    data: params,
  });
};

export const register = (params) => {
  return request({
    url: "/user/register",
    method: "POST",
    data: params,
  });
};

export const refreshAccessToken = () => {
  return request({
    url: "/user/refresh",
    method: "get",
  });
}
