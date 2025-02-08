import { Button, Text, View } from "@tarojs/components";
import { Card } from "../components/card";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";

export function InteractionEntry({info}) {
  const toInteractionMatch = () => {
    Taro.navigateTo({
      url: "/index_subpkg/pages/interaction/index",
    });
  };
  return (
    <Card title={"单词乱斗"}>
      <View className="flex gap-3 mb-3">
        <View></View>
        <View>
          <EntryRight />
        </View>
      </View>
      <Button
        type="primary"
        className="py-1 rounded-full w-40 mx-auto"
        block
        onClick={toInteractionMatch}
      >
        开始匹配
      </Button>
    </Card>
  );
}

function EntryRight({}) {
  const [list, setList] = useState([
    { text: "累计pk数", value: 0, type: "total_count" },
    { text: "累计胜场", value: 0, type: "win_count" },
    { text: "pk胜率", value: "0%", type: "win_rate" },
  ]);

  useEffect(() => {}, []);
  return (
    <View className="felx gap-3 flex-wrap">
      {list.map((item) => (
        <RightItem item={item} key={item.text} />
      ))}
    </View>
  );
}

function RightItem({ item }) {
  return (
    <View className="flex gap-2 flex-col items-center">
      <Text>{item.value}</Text>
      <Text>{item.text}</Text>
    </View>
  );
}
