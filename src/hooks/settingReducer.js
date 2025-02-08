


export const settingReducer = (state, action) => {
  const { type, payload } = action;
  const res = updateSetting(state[type], payload)
  switch (type) {
    case 'daySetting':
      return {
        ...state,
        daySetting: res
      }
    case 'reviewSetting':
      return {
        ...state,
        reviewSetting: res
      }
    case 'studySetting':
      return {
        ...state,
        studySetting: res
      }
    case 'wordSetting':
      return {
        ...state,
        wordSetting: res
      }
  }
}


function updateSetting(list, payload) {

  const { type } = payload
  const index = list.findIndex(item => item.type === type)
  if (index !== -1) {
    list[index] = { ...list[index], ...payload }
  }
  console.log(list, '修改后list');

  return list
}


export const initialState = {
  daySetting: [
    {
      text: '每日学习',
      type: 'study',
      value: true,
      renderType: 'switch'
    },
    {
      text: '每日复习',
      type: 'review',
      value: true,
      renderType: 'switch'
    },
  ],
  reviewSetting: [
    {
      text: '复习时重复次数',
      type: 'repeat-num',
      value: 1,
      min: 1,
      max: 10,
      renderType: 'inputNumber'
    }
  ],
  studySetting: [
    {
      text: '学习时重复次数',
      type: 'repeat-num',
      value: 1,
      min: 1,
      max: 10,
      renderType: 'inputNumber'
    }
  ],
  wordSetting: [
    {
      text: '每组单词数量',
      type: 'word-num',
      value: 10,
      min: 10,
      max: 20,
      renderType: 'inputNumber'
    }
  ]
}