import { View } from "@tarojs/components";
import { InteractionUser } from "./widgets/interaction-user";
import { InteractionResult } from "./widgets/interaction-result";
import { InteractionTopic } from "./widgets/interaction-topic";
import { useLoad } from "@tarojs/taro";
import React, { useContext, useState } from "react";
import { Context } from "../../../context";

export default function InteractionPage() {
  const { socket } = useContext(Context);
  const [question, setQuestion] = useState();
  const [isFinished, setIsFinished] = useState(false);
  useLoad(() => {
    socket.send({
      data: JSON.stringify({
        type: "start",
      }),
    });
    socket.onmessage = function (data) {
      console.log("收到消息", data);
      const res = JSON.parse(data.data);
      if (res.type === "question") {
        setQuestion(res.data);
      }
    };
  });
  return (
    <View className="h-screen bg-[#5977F2]">
      <InteractionUser></InteractionUser>
      <View className="px-3">
        {isFinished ? (
          <React.Fragment>
            <InteractionResult></InteractionResult>
            <Footer></Footer>
          </React.Fragment>
        ) : (
          <InteractionTopic></InteractionTopic>
        )}
      </View>
    </View>
  );
}

function Footer() {
  return <View className=""></View>;
}
