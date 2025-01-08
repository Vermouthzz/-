import { View, Image, Text } from "@tarojs/components";

export function Avatar() {
  return (
    <View className="h-[600rpx]">
      <View className="flex flex-col">
        <Image className="w-28 h-28 rounded-full mb-5"></Image>
        <Text className="text-white text-base">我活在梦里</Text>
      </View>
    </View>
  );
}
