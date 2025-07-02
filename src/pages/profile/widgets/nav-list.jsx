import { Image, Text, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import clsx from "clsx";
import { useMemo } from "react";
import { judgeIsLogin } from "../../../utils";

export function NavList({ className }) {
  const navList = useMemo(() => {
    return [
      {
        title: "单词书",
        icon: require("@/assets/images/word_book.png"),
        callback: () => {
          Taro.navigateTo({
            url: "/index_subpkg/pages/word-book-switch/index",
          });
        },
      },
      {
        title: "生词本",
        icon: require("@/assets/images/book.png"),
        callback: () => {
          Taro.navigateTo({
            url: "/profile_subpkg/pages/shengci/index",
          });
        },
      },
      // {
      //   title: "错题本",
      //   icon: require("@/assets/images/cuoti.png"),
      //   callback: () => {
      //     Taro.navigateTo({
      //       url: "/profile_subpkg/pages/cuoti/index",
      //     });
      //   },
      // },
      {
        title: "收藏夹",
        icon: require("@/assets/images/shoucang.png"),
        callback: () => {
          Taro.navigateTo({
            url: "/profile_subpkg/pages/shoucang/index",
          });
        },
      },
    ];
  }, []);

  return (
    <View className={clsx(className, "flex bg-white")}>
      {navList.map((item) => (
        <Item key={item.title} item={item} />
      ))}
    </View>
  );
}

function Item({ item }) {
  return (
    <View
      className="flex-1 flex flex-col items-center gap-2"
      onClick={judgeIsLogin(item.callback)}
    >
      <Image className="w-20 h-6" src={item.icon} mode="aspectFit" />
      <Text className="text-sm">{item.title}</Text>
    </View>
  );
}
