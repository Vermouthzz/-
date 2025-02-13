import { Text, View } from "@tarojs/components";
import { CommonItem } from "../components/common-item";
import { Context } from "../context";
import { useContext, useState } from "react";

export function InteractionTopic() {
  return (
    <View className="mt-6">
      <TopicName></TopicName>
      <TopicList></TopicList>
    </View>
  );
}

const enumNum = {
  1: "一",
  2: "二",
  3: "三",
  4: "四",
  5: "五",
  6: "六",
  7: "七",
  8: "八",
  9: "九",
  10: "十",
};
function TopicName() {
  const {
    question: { word, questionId },
  } = useContext(Context);
  return (
    <View className="flex flex-col gap-1 items-center">
      <Text className="text-sm">第{enumNum[questionId * 1 + 1]}题</Text>
      <Text className="text-lg text-white font-semibold">{word}</Text>
    </View>
  );
}

function TopicList() {
  const {
    question: { options },
    replyInfo,
    sendMessage,
    game_id,
    time,
  } = useContext(Context);

  const [selectItem, setSelectItem] = useState(null);
  const handleClick = (item) => {
    if (replyInfo.isReply || time === 0) return;
    const data = {
      type: "answer",
      data: item,
      game_id,
    };
    sendMessage(data);
    setSelectItem(item);
  };
  return (
    <View className="flex flex-col gap-4 mt-8">
      {options.map((item) => (
        <CommonItem
          clickCallback={handleClick}
          key={item.id}
          showResult={replyInfo.isReply && item.id === selectItem?.id}
          isCorrect={
            item.id === selectItem?.id && replyInfo.correct_id === item.id
          }
          item={item}
          className="bg-white p-4"
        >
          <Text className="text-base">{item.mean}</Text>
        </CommonItem>
      ))}
    </View>
  );
}
