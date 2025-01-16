export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/interaction/index",
    "pages/profile/index",
    "pages/login/index",
    "pages/word/index",
    "pages/setting/index",
    "pages/word-detail/index",
    "pages/review/index",
    "pages/word-listen-write/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    list: [
      {
        text: "首页",
        pagePath: "pages/index/index",
        iconPath: "",
        selectedIconPath: "",
      },
      {
        text: "对战",
        pagePath: "pages/interaction/index",
        conPath: "",
        selectedIconPath: "",
      },
      {
        text: "我的",
        pagePath: "pages/profile/index",
        conPath: "",
        selectedIconPath: "",
      },
    ],
  },
});
