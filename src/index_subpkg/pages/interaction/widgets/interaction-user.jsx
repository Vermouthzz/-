import { Avatar, CircleProgress } from "@nutui/nutui-react-taro";
import { Text, View, Image } from "@tarojs/components";
import { useEffect, useState } from "react";

export function InteractionUser() {
  const [time, setTime] = useState(10);
  useEffect(() => {
    let timer =
      time > 0 &&
      setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [time]);
  return (
    <View className="flex justify-between">
      <LeftUser></LeftUser>
      <Middle time={time}></Middle>
      <RightUser></RightUser>
    </View>
  );
}

function Middle({ time }) {
  return (
    // <View
    //   className="text-3xl mt-7 text-[#FFE66C] font-semibold"
    //   style={{ textShadow: "0 0 0.2em #8F7" }}
    // >
    //   胜利
    // </View>

    <View className="mt-7">
      <CircleProgress
        percent={10}
        radius={25}
        className="bg-green-300 rounded-full"
      >
        <Text className="text-white font-semibold text-lg">{time}</Text>
      </CircleProgress>
    </View>
  );
}

const leftStyle = {
  width: "40vw",
  height: "70rpx",
  borderTop: "70rpx solid #54A3FC",
  borderRight: "70rpx solid transparent",
};
function LeftUser() {
  return (
    <View style={leftStyle} className="relative mt-6">
      <Text className="absolute text-white text-2xl font-semibold -top-8 left-14">
        824
      </Text>
      <View className="absolute -top-12 left-5">
        <Avatar
          className=""
          size="small"
          src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
        ></Avatar>
        <Image
          className="w-6 h-6 absolute right-1 -top-4"
          src={require("../../../../public/image/common/winner.svg")}
        ></Image>
      </View>
    </View>
  );
}
const rightStyle = {
  width: "40vw",
  height: "70rpx",
  borderBottom: "70rpx solid #FF7B83",
  borderLeft: "70rpx solid transparent",
};
function RightUser() {
  return (
    <View style={rightStyle} className="relative mt-8">
      <Text className="absolute top-0.5 right-14 text-2xl font-semibold text-white">
        899
      </Text>
      <View className="absolute -top-3 right-5">
        <Avatar
          className=""
          size="small"
          src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
        ></Avatar>
        <Image
          className="w-6 h-6 absolute -top-4 left-1"
          src={require("../../../../public/image/common/winner.svg")}
        ></Image>
      </View>
    </View>
  );
}
