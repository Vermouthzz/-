import { Avatar, CircleProgress } from "@nutui/nutui-react-taro";
import { Text, View, Image } from "@tarojs/components";
import { useEffect, useState } from "react";

export function InteractionUser({ userInfo, time, isFinish }) {
  return (
    <View className="flex justify-between">
      <LeftUser info={userInfo.myInfo}></LeftUser>
      {isFinish ? (
        <View className="mt-7">
          <CircleProgress
            percent={10}
            radius={25}
            className="bg-green-300 rounded-full"
          >
            <Text className="text-white font-semibold text-lg">{time}</Text>
          </CircleProgress>
        </View>
      ) : (
        <View
          className="text-3xl mt-7 text-[#FFE66C] font-semibold"
          style={{ textShadow: "0 0 0.2em #8F7" }}
        >
          {userInfo.myInfo.is_winner ? "胜利" : "失败"}
        </View>
      )}
      <RightUser info={userInfo.otherInfo}></RightUser>
    </View>
  );
}

const leftStyle = {
  width: "40vw",
  height: "70rpx",
  borderTop: "70rpx solid #54A3FC",
  borderRight: "70rpx solid transparent",
};
function LeftUser({ info }) {
  return (
    <View style={leftStyle} className="relative mt-6">
      <Text className="absolute text-white text-2xl font-semibold -top-8 left-14">
        824
      </Text>
      <View className="absolute -top-12 left-5">
        <Avatar className="" size="small" src={info.avatar}></Avatar>
        {info.is_winner ? (
          <Image
            className="w-6 h-6 absolute right-1 -top-4"
            src={require("../../../../public/image/common/winner.svg")}
          ></Image>
        ) : null}
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
function RightUser({ info }) {
  return (
    <View style={rightStyle} className="relative mt-8">
      <Text className="absolute top-0.5 right-14 text-2xl font-semibold text-white">
        899
      </Text>
      <View className="absolute -top-3 right-5">
        <Avatar className="" size="small" src={info.avatar}></Avatar>
        {info.is_winner ? (
          <Image
            className="w-6 h-6 absolute -top-4 left-1"
            src={require("../../../../public/image/common/winner.svg")}
          ></Image>
        ) : null}
      </View>
    </View>
  );
}
