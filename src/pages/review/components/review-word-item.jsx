import { Text, View } from "@tarojs/components";
import { VolumeMax } from "@nutui/icons-react-taro";

export function ReviewWordItem() {
  return (
    <View className="flex border-b border-[#F6F6F6] py-3 items-start">
      <Text className="rounded-full w-5 leading-5 text-sm text-center bg-[#F0F2F8] text-[#AFB1B8]">
        1
      </Text>
      <View className="flex flex-col flex-1 gap-2 ml-2">
        <View className="flex gap-1">
          <Text>Per</Text>
          <Text className="text-[#C3C3C3]">/'ndgde/</Text>
        </View>
        <Text className="text-sm line-clamp-1 text-[#8F9192]">
          adj.实际的;真实的
        </Text>
      </View>
      <VolumeMax color="#559B83" />
    </View>
  );
}
