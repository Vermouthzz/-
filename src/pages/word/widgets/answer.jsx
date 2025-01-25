import { Text, View } from "@tarojs/components";
import clsx from "clsx";

export function Answer({ className }) {
  return (
    <View className={clsx(className, "flex flex-col gap-2 w-11/12 mx-auto")}>
      <WordBlock></WordBlock>
      <WordBlock></WordBlock>
      <WordBlock></WordBlock>
      <WordBlock></WordBlock>
    </View>
  );
}

function WordBlock() {
  return (
    <View
      className="p-3 bg-green-600 flex flex-col shadow-sm"
      hoverClass="opacity-80"
    >
      <Text className="text-xs">n.</Text>
      <View>天使，神兽，守护神</View>
    </View>
  );
}
