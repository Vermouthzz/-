import request from "../request"

export function uploadAvatar(params) {
  return request({
    url: '/upload/avatar',
    method: 'post',
    data: params
  })
}