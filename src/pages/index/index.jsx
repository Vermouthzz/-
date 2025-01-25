import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.css";
import { WordBook } from "./widgets/word-book";
import { DayTask } from "./widgets/day-task";
import { InteractionEntry } from "./widgets/interaction-entry";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="flex flex-col gap-6">
      <WordBook></WordBook>
      <InteractionEntry></InteractionEntry>
      <DayTask></DayTask>
    </View>
  );
}
