import { View, Text } from "@tarojs/components";
import { Avatar } from "@nutui/nutui-react-taro";
import { MenuList } from "./widgets/menu-list";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { NavList } from "./widgets/nav-list";

export default function Profile() {
  const [userInfo, setUserInfo] = useState({});

  useDidShow(() => {
    const info = Taro.getStorageSync("userInfo") || {};
    setUserInfo(info);
  });
  return (
    <View className="bg-[#f8f8f8] h-screen">
      <View className="">
        <ProfileTop info={userInfo}></ProfileTop>
        <NavList
          className={"my-2 shadow-md w-[90%] mx-auto rounded-md py-2"}
        ></NavList>
      </View>
      <MenuList></MenuList>
    </View>
  );
}

function ProfileTop({ info = {} }) {
  const isLogin = Object.keys(info).length > 0;
  console.log(info);

  return (
    <View
      className=""
      style={{ background: "linear-gradient(135deg, #a8c6b9, #e5e0d2)" }}
    >
      {isLogin ? (
        <View className="h-36  flex flex-col justify-center items-center gap-3">
          <Avatar size="large" src={info.avatar}></Avatar>
          <View className="text-white text-base">{info.user_name}</View>
        </View>
      ) : (
        <View className="h-36 bg-slate-500 flex flex-col justify-center items-center gap-3">
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
      )}
    </View>
  );
}
