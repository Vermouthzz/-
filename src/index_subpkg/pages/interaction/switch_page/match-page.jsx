import "../index.scss";
import { View, Image } from "@tarojs/components";
import { Avatar } from "@nutui/nutui-react-taro";
import { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import Taro from "@tarojs/taro";
export function MatchPage({ isMatch }) {
  return (
    <View className="flex h-screen relative bg-[#789765]">
      {isMatch ? <MatchResult /> : <MatchLoading />}
      <LeftUser />
      <Middle />
      <RightUser />
    </View>
  );
}

function MatchLoading() {
  return (
    <View className="absolute top-28 w-full left-0 text-center text-white text-xl blinking">
      正在匹配对手中...
    </View>
  );
}

function MatchResult() {
  return (
    <View className="absolute top-28 w-full left-0 text-center text-white text-xl">
      匹配成功！正在进入对战
    </View>
  );
}

function Middle() {
  return (
    <View className="h-full flex flex-col justify-center items-center">
      <Image
        className="w-20 -mt-20"
        src={require("../../../../public/image/common/vs.svg")}
      ></Image>
    </View>
  );
}

function LeftUser() {
  const [myAvatar, setMyAvatar] = useState("");
  useEffect(() => {
    const userInfo = Taro.getStorageSync("userInfo");
    setMyAvatar(userInfo.avatar);
  }, []);
  return (
    <View className="h-full flex-1 flex flex-col justify-center items-center">
      <Avatar className="-mt-40 w-24 h-24" size="large" src={myAvatar}></Avatar>
    </View>
  );
}

function RightUser() {
  const {
    allUserInfo: { otherInfo },
  } = useContext(Context);
  console.log(otherInfo, "----------------");

  return (
    <View className="h-full flex-1 flex flex-col justify-center items-center">
      <Avatar className="w-24 h-24" src={otherInfo.avatar || ""}></Avatar>
    </View>
  );
}
