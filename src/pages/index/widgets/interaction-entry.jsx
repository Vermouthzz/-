import { Button, Text, View } from "@tarojs/components";
import { Card } from "../components/card";
import Taro from "@tarojs/taro";

export function InteractionEntry(props) {
  const toInteractionMatch = () => {
    Taro.navigateTo({
      url: "/index_subpkg/pages/interaction-match/index",
    });
  };
  return (
    <Card title={"单词乱斗"}>
      <View className="flex gap-3 mb-3">
        <View></View>
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

function EntryRight() {
  const list = [{ text: "累计pk数", value: "" }];
  return <View className="felx gap-3 flex-wrap"></View>;
}

function RightItem() {
  return (
    <View className="flex gap-2 flex-col">
      <Text>1500</Text>
      <Text>累计pk数</Text>
    </View>
  );
}
