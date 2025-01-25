import { Text, View } from "@tarojs/components";
import { CommonItem } from "../components/common-item";

export function InteractionTopic() {
  return (
    <View className="mt-6">
      <TopicName></TopicName>
      <TopicList></TopicList>
    </View>
  );
}

function TopicName() {
  return (
    <View className="flex flex-col gap-1 items-center">
      <Text className="text-sm">第一题</Text>
      <Text className="text-lg text-white font-semibold">Angle</Text>
    </View>
  );
}

function TopicList() {
  const list = [1, 2, 3, 4];
  return (
    <View className="flex flex-col gap-4 mt-8">
      {list.map((item) => (
        <CommonItem className="bg-white p-4">
          <Text className="text-base">系统，变量</Text>
        </CommonItem>
      ))}
    </View>
  );
}
