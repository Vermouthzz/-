import { Text, View } from "@tarojs/components";
import { VolumeMax } from "@nutui/icons-react-taro";
import { Input, Button } from "@nutui/nutui-react-taro";
import { useEffect, useState } from "react";

export function WordWrite() {
  const word = "angle";
  const [len, setLen] = useState(0);
  useEffect(() => {
    setLen(word.length);
  }, []);
  return (
    <View className="flex flex-col items-center">
      <View className="mb-4">
        <Input className="tracking-widest" placeholder=""></Input>
        <View className="flex gap-1 justify-center">
          {new Array(len).fill(1).map((item, index) => (
            <LineItem key={index}></LineItem>
          ))}
        </View>
      </View>
      <View className="flex rounded-full py-1 bg-[#eee] px-3 items-center">
        <VolumeMax color="#559B83" />
        <Text className="text-[#559B83] ml-2">提示</Text>
      </View>
      <WordDefinition></WordDefinition>

      <Footer></Footer>
    </View>
  );
}

function LineItem() {
  return <View className="h-[4rpx] w-5 bg-slate-600"></View>;
}

function WordDefinition() {
  return <View className="mt-10">n.天使;爱人</View>;
}

function Footer() {
  return (
    <View className="flex justify-between w-4/5 fixed bottom-32">
      <Button type="default">上一个</Button>
      <Button type="default">下一个</Button>
    </View>
  );
}
