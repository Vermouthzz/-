import { Text, View } from "@tarojs/components";
import { CommonItem } from "../components/common-item";
import { Context } from "../../../../context";
import { useContext } from "react";

export function InteractionTopic({ question }) {
  return (
    <View className="mt-6">
      <TopicName></TopicName>
      <TopicList list={question.options}></TopicList>
    </View>
  );
}

function TopicName() {
  return (
    <View className="flex flex-col gap-1 items-center">
      <Text className="text-sm">第一题</Text>
      <Text className="text-lg text-white font-semibold">Angle</Text>
    </View>
  );
}

function TopicList() {
  const list = [1, 2, 3, 4];
  const { socket } = useContext(Context);
  const handleClick = (item) => {
    const data = JSON.stringify({
      type: "answer",
      data: item,
    });
    socket.send({ data });
  };
  return (
    <View className="flex flex-col gap-4 mt-8">
      {list.map((item) => (
        <CommonItem
          selectItem={handleClick}
          key={item}
          className="bg-white p-4"
        >
          <Text className="text-base">系统，变量</Text>
        </CommonItem>
      ))}
    </View>
  );
}
