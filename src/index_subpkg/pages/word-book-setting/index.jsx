import { Text, View } from "@tarojs/components";

export default function WordBookSetting() {
  return <View></View>;
}

function BookBlock() {
  return (
    <View>
      <View></View>
      <View className="flex flex-col justify-between">
        <View className="flex flex-col gap-2">
          <Text>四级真题核心词汇书</Text>
          <View className="flex gap-1">
            <Text className="text-white">真题</Text>
            <Text>1654词</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
