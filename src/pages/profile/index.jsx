import { View, Text } from "@tarojs/components";
import { Avatar } from "@nutui/nutui-react-taro";
import { MenuList } from "./widgets/menu-list";
import Taro, { useLoad } from "@tarojs/taro";
import { useEffect, useState } from "react";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const info = Taro.getStorageSync("userInfo");
    if (info) {
      setUserInfo((prev) => ({ ...prev, ...info }));
    }
  });
  return (
    <View className="bg-[#f8f8f8] h-screen">
      <ProfileTop info={userInfo}></ProfileTop>
      <MenuList></MenuList>
    </View>
  );
}

function ProfileTop({ info }) {
  console.log(info);
  
  return Object.keys(info).length ? (
    <View className="h-44 bg-slate-500 flex flex-col justify-center items-center gap-3">
      <Avatar size="large" src={info.avatar}></Avatar>
      <Text className="text-white text-base">{info.user_name}</Text>
    </View>
  ) : (
    <View className="h-44 bg-slate-500 flex flex-col justify-center items-center gap-3">
      <Avatar
        size="large"
        src="https://img.cdn.sugarat.top/mdImg/MTY3MDMwNjMxNjY3OA==6401786316670.png"
      ></Avatar>
      <Text
        onClick={() => {
          Taro.navigateTo({ url: "/profile_subpkg/pages/login/index" });
        }}
        className="text-white text-base"
      >
        未登录
      </Text>
    </View>
  );
}
