import Taro from "@tarojs/taro"

export const judgeIsLogin = (callback) => {

  return function (...args) {
    const token = Taro.getStorageSync('token')
    console.log(token);

    if (token) {
      callback.apply(this, args)
    } else {
      console.log('请先登录');

      Taro.showToast({
        title: '请先登录',
        icon: 'none'
      })
      setTimeout(() => {
        Taro.navigateTo({
          url: '/profile_subpkg/pages/login/index?back=true'
        })
      }, 500)
    }
  }
}