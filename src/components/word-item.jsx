import { Text, View } from "@tarojs/components";
import { VolumeMax } from "@nutui/icons-react-taro";
import clsx from "clsx";
import Taro from "@tarojs/taro";

export function WordItem({ className, item, index, handleVoice }) {
  console.log(item);

  return (
    <View
      onClick={() => {
        Taro.navigateTo({
          url: `/index_subpkg/pages/word-detail/index?id=${item.id}`,
        });
      }}
      className={clsx(
        "flex border-b border-[#F6F6F6] py-3 items-start",
        className
      )}
    >
      <Text className="rounded-full w-5 leading-5 text-sm text-center bg-[#F0F2F8] text-[#AFB1B8]">
        {index + 1}
      </Text>
      <View className="flex flex-col flex-1 gap-2 ml-2">
        <View className="flex gap-1">
          <Text>{item.word}</Text>
          <Text className="text-[#C3C3C3]">{item.symbols}</Text>
        </View>
        <Text className="text-sm line-clamp-1 text-[#8F9192]">
          {item.part}
          {item.mean}
        </Text>
      </View>
      <VolumeMax
        color="#559B83"
        onClick={(e) => {
          e.stopPropagation();
          handleVoice(item.voice);
        }}
      />
    </View>
  );
}
