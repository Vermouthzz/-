export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/profile/index",
    "pages/word/index",
    "pages/word-detail/index",
    "pages/review/index",
    "pages/search/index",
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
        iconPath: "./public/image/common/my.png",
        selectedIconPath: "./public/image/common/my.png",
      },
      // {
      //   text: "对战",
      //   pagePath: "pages/interaction/index",
      //   iconPath: "./public/image/common/my.png",
      //   selectedIconPath: "./public/image/common/my.png",
      // },
      {
        text: "我的",
        pagePath: "pages/profile/index",
        iconPath: "./public/image/common/my.png",
        selectedIconPath: "./public/image/common/my.png",
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
        "pages/theme/index",
        "pages/user-setting/index"
      ],
    },
    {
      root: "index_subpkg",
      pages: [
        "pages/interaction/index",
      ]
    }
  ],
});
