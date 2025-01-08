import { Text, View } from "@tarojs/components";

export function Answer() {
  return (
    <View className="flex flex-col w-11/12 mx-auto">
      <WordBlock></WordBlock>
    </View>
  );
}

function WordBlock() {
  return (
    <View className="p-3 bg-green-600 flex flex-col shadow-sm">
      <Text className="text-xs">n.</Text>
      <View>天使，神兽，守护神</View>
    </View>
  );
}
