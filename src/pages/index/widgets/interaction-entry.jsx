import { Text, View } from "@tarojs/components";
import { Button } from "@nutui/nutui-react-taro";
import { Card } from "../components/card";
import Taro from "@tarojs/taro";
import { useContext, useEffect, useState } from "react";
import { IndexContext } from "../context";
import { judgeIsLogin } from "../../../utils";

export function InteractionEntry({}) {
  const toInteractionMatch = judgeIsLogin(() => {
    Taro.navigateTo({
      url: "/index_subpkg/pages/interaction/index",
    });
  });
  return (
    <Card title={"单词乱斗"}>
      <View className="flex gap-3 py-4">
        <View></View>
        <EntryRight />
      </View>
      <Button
        // type="primary"
        style={{ backgroundColor: "#8ABD5F" }}
        className="py-4 rounded-full w-40 mt-6 mb-3 text-[28rpx] mx-auto "
        block
        onClick={toInteractionMatch}
      >
        开始匹配
      </Button>
    </Card>
  );
}

function EntryRight({}) {
  const { interactionInfo } = useContext(IndexContext);

  return (
    <View className="flex gap-3 flex-wrap w-full">
      {interactionInfo.map((item, index) => (
        <RightItem item={item} key={item.text} />
      ))}
    </View>
  );
}

function RightItem({ item }) {
  return (
    <View className="flex flex-1 gap-1 flex-col items-center">
      <Text>
        {item.value}
        {item.unit ? item.unit : ""}
      </Text>
      <Text>{item.text}</Text>
    </View>
  );
}
