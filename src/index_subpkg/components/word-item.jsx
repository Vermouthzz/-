import { Text, View } from "@tarojs/components";
import { VolumeMax } from "@nutui/icons-react-taro";
import clsx from "clsx";

export function WordItem({
  className,
  item,
  index,
  showWord = true,
  showDesc = true,
  handleVoice,
}) {
  return (
    <View
      className={clsx(
        "flex border-b border-[#F6F6F6] py-3 items-start",
        className
      )}
    >
      <Text className="rounded-full w-5 leading-5 text-sm text-center bg-[#F0F2F8] text-[#AFB1B8]">
        {index + 1}
      </Text>
      <View className="flex flex-col flex-1 gap-2 ml-2">
        <View className="flex gap-1 relative">
          <Text>{item.word}</Text>
          <Text className="text-[#559B83]">{item.symbols}</Text>
          <View>{!showWord && <WordMask />}</View>
        </View>
        <View className="text-sm line-clamp-1 relative text-[#8F9192]">
          <Text>
            {item.part}
            {item.mean}
          </Text>
          {!showDesc && <WordMask />}
        </View>
      </View>
      <VolumeMax color="#559B83" onClick={() => handleVoice(item.voice)} />
    </View>
  );
}

const WordMask = () => {
  return (
    <View className="w-full absolute left-0 top-0 h-full bg-[#aaa]"></View>
  );
};
