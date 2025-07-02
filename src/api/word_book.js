import request from "../request";

export function getWordBook(params) {
  return request({
    url: '/book/list',
    method: 'get',
    data: params
  })
}

export function addUserBookAPI(data) {
  return request({
    url: '/book',
    method: 'PUT',
    data
  })
}

export function delUserBookAPi(data) {
  return request({
    url: '/book',
    method: 'DELETE',
    data
  })
}

export function getUserBookAPI() {
  return request({
    url: '/book',
    method: 'get'
  })
}

export const getBookPrecessAPI = (data) => {
  return request({
    url: '/book/process',
    method: 'get',
    data
  })
}

export const switchCurrentBookAPI = (data) => {
  return request({
    url: '/book/switch',
    method: 'put',
    data
  })
}

export const getBookTotalInfoAPI = (data) => {
  return request({
    url: '/book/total',
    method: 'get',
    data
  })
}

export const getBookHadExistAPI = (data) => {
  return request({
    url: '/book/hadexist',
    method: 'POST',
    data
  })
}