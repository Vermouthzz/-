export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/profile/index",
    "pages/search/index",
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
        "pages/user-setting/index",
        "pages/cooper/index",
        "pages/share-poster/index"
      ],
    },
    {
      root: "index_subpkg",
      pages: [
        "pages/interaction/index",
        "pages/word-listen-write/index",
        "pages/word-category/index",
        "pages/word-book-setting/index",
        "pages/word-book-switch/index",
        "pages/word/index",
        "pages/word-detail/index",
        "pages/review/index",
        "pages/word-study-list/index"
      ]
    }
  ],
});
