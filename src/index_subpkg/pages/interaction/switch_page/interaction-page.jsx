import { View } from "@tarojs/components";
import { InteractionUser } from "../widgets/interaction-user";
import { InteractionResult } from "../widgets/interaction-result";
import { InteractionTopic } from "../widgets/interaction-topic";
import React, { useContext } from "react";
import { Context } from "../context";
import { Button } from "@nutui/nutui-react-taro";
import clsx from "clsx";

export function InteractionPage() {
  const { finishInfo } = useContext(Context);
  return (
    <View className="h-screen bg-[#5977F2]">
      <InteractionUser></InteractionUser>
      <View className="px-3">
        {finishInfo.isFinished ? (
          <React.Fragment>
            <InteractionResult className="mt-7 h-[60vh]"></InteractionResult>
            <Footer className="mt-5"></Footer>
          </React.Fragment>
        ) : (
          <InteractionTopic></InteractionTopic>
        )}
      </View>
    </View>
  );
}

function Footer({ className }) {
  const { reSetGeme } = useContext(Context);
  const reStart = () => {
    // TODO: 重置游戏
    reSetGeme();
  };
  return (
    <View className={clsx("w-full shadow-t-md", className)}>
      <View className="grid grid-cols-2 gap-4 p-4">
        <Button
          onClick={reStart}
          className="!rounded-button bg-blue-600 text-white py-3 text-center font-medium"
        >
          再来一局
        </Button>
        <Button className="!rounded-button bg-gray-200 text-gray-700 py-3 text-center font-medium">
          返回首页
        </Button>
      </View>
    </View>
  );
}
