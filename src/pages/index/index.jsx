import { View, Text } from "@tarojs/components";
import { useDidShow, useLoad } from "@tarojs/taro";
import "./index.css";
import { WordBook } from "./widgets/word-book";
import { DayTask } from "./widgets/day-task";
import { InteractionEntry } from "./widgets/interaction-entry";
import { getInteractionInfo } from "../../api/interaction";
import { useContext, useState } from "react";
import { Context, withContext } from "./context";

export default withContext(Index);

function Index() {
  const { setInteractionInfo } = useContext(Context);
  const getInteraction = async () => {
    const res = await getInteractionInfo();
    console.log(res);
    if (res.code === 200) {
      setInteractionInfo(res.data);
    }
  };
  useLoad(() => {
    console.log("Page loaded.");
    getInteraction();
  });

  // useDidShow(() => {
  //   console.log("Page showed.");
  //   getInteraction();
  // });

  return (
    <View className="flex flex-col gap-6">
      <WordBook></WordBook>
      <InteractionEntry></InteractionEntry>
      <DayTask></DayTask>
    </View>
  );
}
