import { View } from "@tarojs/components";

export function SearchHistory() {
  return (
    <View>
      <View className="flex flex-wrap gap-3"></View>
      <ClearHistory></ClearHistory>
    </View>
  );
}

function Item() {
  return <View></View>;
}

function ClearHistory() {
  return (
    <View className="flex">
      <Text className="text-sm text-gray-400">清空历史记录</Text>
    </View>
  );
}
