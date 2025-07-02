


export const settingReducer = (state, action) => {
  const { type, payload } = action;
  if (type === 'all') {
    return {
      ...payload
    }
  }
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
  return list
}


export const initialState = {
  daySetting: [
    {
      text: '学习是否自动播放音频',
      type: 'study',
      value: true,
      renderType: 'switch'
    }
  ],
  reviewSetting: [
    {
      text: '复习时重复次数',
      type: 'repeat-num',
      value: 1,
      min: 1,
      max: 10,
      renderType: 'inputNumber'
    },
    {
      text: '听写时重复次数',
      type: 'review-listen-num',
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
      text: '每日学习单词数量',
      type: 'study-word-num',
      value: 10,
      min: 10,
      max: 20,
      renderType: 'inputNumber'
    },
    {
      text: '复习每组单词数量',
      type: 'repeat-word-num',
      value: 10,
      min: 10,
      max: 20,
      renderType: 'inputNumber'
    }
  ]
}