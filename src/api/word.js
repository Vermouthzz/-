import request from "../request";

export const getStudyWord = (data) => {
  return request({
    url: '/word/study/list',
    method: 'POST',
    data
  })
  // return request({
  //   url: '/api/add',
  //   method: 'GET',
  // })
}

export const getSingleWordAPI = (data) => {
  return request({
    url: '/word/study/single',
    method: 'get',
    data
  })
}

export const updateWordStudy = (data) => {
  return request({
    url: '/word/study/update',
    method: 'post',
    data
  })
}

export const getNoneStudyWord = (data) => {
  return request({
    url: '/word/noneStudy/list',
    method: 'POST',
    data
  })
}

export const getHasStudyWord = (data) => {
  return request({
    url: '/word/hasLearn/list',
    method: 'POST',
    data
  })
}

export const getWordDetail = (data) => {
  return request({
    url: '/word/detail',
    method: 'get',
    data
  })
}

export const getReviewWordAPI = (data) => {
  return request({
    url: '/word/review/list',
    method: 'POST',
    data
  })
}

export const collectWordAPI = (data) => {
  return request({
    url: '/word/collect',
    method: 'POST',
    data
  })
}

export const getCollectWordAPI = (data) => {
  return request({
    url: '/word/collect/list',
    method: 'POST',
    data
  })
}

export const recordRawWordAPI = (data) => {
  return request({
    url: '/word/raw',
    method: 'post',
    data
  })
}

export const getRawWordAPI = (data) => {
  return request({
    url: '/word/raw/list',
    method: 'post',
    data
  })
}


export const getFooterInfoAPI = (data) => {
  return request({
    url: '/word/footer',
    data
  })
}

export const searchWordAPI = (data) => {
  return request({
    url: '/word/search',
    method: 'post',
    data
  })
}