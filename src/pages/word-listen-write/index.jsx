import { Text, View } from "@tarojs/components";
import { WordWrite } from "./widgets/word-write";
// import { useEffect } from "react";

export default function WordListenWritePage() {
  // useEffect(() => {
  //   window.addEventListener('keyup')
  // }, [])
  return (
    <View className="h-full flex flex-col">
      <Text className="mx-auto mt-10 mb-6">1/10</Text>
      <WordWrite></WordWrite>
    </View>
  );
}
