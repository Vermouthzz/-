import { View, Text } from "@tarojs/components";
import { Avatar } from "@nutui/nutui-react-taro";
import { MenuList } from "./widgets/menu-list";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";
import { useEffect, useState } from "react";


export default function Profile() {
  const [userInfo, setUserInfo] = useState({});

  useDidShow(() => {
    const info = Taro.getStorageSync("userInfo");
    if (info && JSON.stringify(info) !== JSON.stringify(userInfo)) {
      setUserInfo(info);
    }
  });
  return (
    <View className="bg-[#f8f8f8] h-screen">
      <ProfileTop info={userInfo}></ProfileTop>
      <MenuList></MenuList>
    </View>
  );
}

function ProfileTop({ info = {} }) {
  const isLogin = Object.keys(info).length > 0;
  console.log(info);
  
  return isLogin ? (
    <View className="h-44 bg-slate-500 flex flex-col justify-center items-center gap-3">
      <Avatar size="large" src={info.avatar}></Avatar>
      <View className="text-white text-base">{info.user_name}</View>
    </View>
  ) : (
    <View className="h-44 bg-slate-500 flex flex-col justify-center items-center gap-3">
      <Avatar
        size="large"
        src="http://127.0.0.1:3000/app/public/upload/avatar/1738219150649_k3130DnDjamKc1a10bbf0f9924dce991afc09698dcf0.jpg"
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
