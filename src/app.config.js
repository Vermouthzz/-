export default defineAppConfig({
  pages: [
    'pages/index/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    list: [
      { text: '首页', pagePath: 'pages/index', iconPath: '', selectedIconPath: '' },
      { text: '对战', pagePath: 'pages/interaction', conPath: '', selectedIconPath: '' },
      { text: '我的', pagePath: 'pages/profile', conPath: '', selectedIconPath: '' },
    ]
  }
})
