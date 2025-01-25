import { View, Text } from "@tarojs/components";

export function SearchHistory() {
  return (
    <View className="mt-6 px-3">
      <View className="mb-4">搜索历史</View>
      <View className="flex flex-wrap gap-3 px-3">
        <Item>1</Item>
        <Item>2</Item>
        <Item>3</Item>
        <Item>4</Item>
      </View>
      <ClearHistory></ClearHistory>
    </View>
  );
}

function Item() {
  return (
    <View className="py-1 rounded-md bg-gray-200 px-3" hoverClass="bg-gray-300">
      1
    </View>
  );
}

function ClearHistory() {
  return (
    <View className="flex mt-3">
      <Text className="text-sm text-gray-400">清空历史记录</Text>
    </View>
  );
}
