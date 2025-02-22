import { Text, View, Image } from "@tarojs/components";

export default function WordBookSetting() {
  return (
    <View className="h-screen bg-slate-500">
      <BookBlock />
    </View>
  );
}

function BookBlock() {
  return (
    <View className="flex gap-3 p-6 bg-white">
      <View className="w-20 h-28 bg-slate-600 rounded-md text-white font-semibold">
        考研
      </View>
      <View className="flex flex-col justify-between">
        <View className="flex flex-col gap-2">
          <Text>四级真题核心词汇书</Text>
          <View className="flex gap-1 text-sm">
            <Text className="text-white bg-orange-400 rounded-full px-1">
              真题
            </Text>
            <Text className="">1654词</Text>
          </View>
        </View>
        <View className="flex gap-2 items-center">
          <View className="text-[24rpx] font-medium text-white bg-green-500 rounded-[4rpx] p-1">
            预计完成时间
          </View>
          <Text>2025年09月26日</Text>
        </View>
      </View>
    </View>
  );
}


function StudySetting() {
  
}
