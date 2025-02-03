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
    <View className={clsx(className, "")}>
      <Button className="w-4/5 bg-inherit text-white" onClick={reStart}>
        再来一局
      </Button>
    </View>
  );
}
