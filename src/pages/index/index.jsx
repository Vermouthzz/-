import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.css";
import { WordBook } from "./widgets/word-book";
import { DayTask } from "./widgets/day-task";
import { InteractionEntry } from "./widgets/interaction-entry";
import { getInteractionInfo } from "../../api/interaction";
import { useState } from "react";
export default function Index() {
  const [interactionInfo, setInteractionInfo] = useState({
    total_count: 0,
    total_win: 0,
    win_rate: 0,
  });
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

  return (
    <View className="flex flex-col gap-6">
      <WordBook></WordBook>
      <InteractionEntry info={interactionInfo}></InteractionEntry>
      <DayTask></DayTask>
    </View>
  );
}
