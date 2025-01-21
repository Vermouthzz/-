import { Avatar } from "@nutui/nutui-react-taro";
import { View, Image } from "@tarojs/components";
import Taro, { useLoad, useUnload } from "@tarojs/taro";
import { useEffect, useState } from "react";
import "./index.scss";
export default function MatchPage() {
  const [isMatch, setIsMatch] = useState(false);

  useLoad(() => {
    Taro.connectSocket({
      url: "ws://localhost:7001/ws",
    }).then((task) => {
      task.onMessage((data) => {
        console.log(data);
      });
      task.onOpen(() => {
        console.log("连接成功");
      });
      task.onError(() => {
        console.log("连接失败");
      });
      task.onClose(() => {
        console.log("连接关闭");
      });
    });
  });
  useUnload(() => {
    Taro.closeSocket();
  });
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
        src={require("../../public/image/common/vs.svg")}
      ></Image>
    </View>
  );
}

function LeftUser() {
  return (
    <View className="h-full flex-1 flex flex-col justify-center items-center">
      <Avatar
        className="-mt-40 w-24 h-24"
        size="large"
        src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
      ></Avatar>
    </View>
  );
}

function RightUser() {
  return (
    <View className="h-full flex-1 flex flex-col justify-center items-center">
      <Avatar
        className="w-24 h-24"
        src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
      ></Avatar>
    </View>
  );
}
