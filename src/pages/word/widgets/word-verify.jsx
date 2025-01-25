import { Image, Text, View } from "@tarojs/components";
import Taro, { useLoad, useUnload } from "@tarojs/taro";
import { useRef } from "react";

export function WordVerify() {
  const audio = useRef();
  const handleVoice = () => {
    audio.play();
  };
  const getWordList = () => {};
  useLoad(() => {
    audio.current = Taro.createInnerAudioContext();
  });
  useUnload(() => {
    audio.destroy();
  });
  return (
    <View className="flex flex-col items-center">
      <Text className="font-bold text-green-600 text-3xl">angle</Text>
      <View className="flex items-center">
        <Text>/endsfl/</Text>
        <Image
          onClick={handleVoice}
          className="w-1 h-1"
          src="/public/image/common/voice.svg"
        ></Image>
      </View>
    </View>
  );
}

function WordItem() {
  return (
    <View className="flex flex-col items-center">
      <View className="border border-red-600 mb-2">A</View>
      <View className="w-1 h-1 bg-gray-600"></View>
    </View>
  );
}
