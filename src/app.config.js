export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/interaction/index",
    "pages/profile/index",
    "pages/word/index",
    "pages/word-detail/index",
    "pages/review/index",
    "pages/search/index",
    "pages/word-listen-write/index",
    "pages/interaction-match/index",
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
  subpackages: [
    {
      root: "profile_subpkg",
      pages: [
        "pages/login/index",
        "pages/register/index",
        "pages/setting/index",
        "pages/theme/index"
      ],
    },
  ],
});
