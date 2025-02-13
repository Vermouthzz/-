import request from "../request"

export function getInteractionInfo(params) {
  return request({
    url: '/interaction/info',
    method: 'get',
  })
}