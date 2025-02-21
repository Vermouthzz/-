import { View } from "@tarojs/components";
import { Tabs } from "@nutui/nutui-react-taro";
import { useMemo } from "react";
import { WordItem } from "../../components/word-item";

export default function WordStudyList() {
  const tabList = useMemo(() => {
    return [
      {
        id: 1,
        title: "今日任务",
      },
      {
        id: 2,
        title: "在学单词",
      },
      {
        id: 3,
        title: "未学单词",
      },
    ];
  }, []);

  const [tab1value, setTab1value] = useState(0);
  return (
    <View className="">
      <Tabs
        value={tab1value}
        onChange={(value) => {
          setTab1value(value);
        }}
        activeType="simple"
      >
        {tabList.map((item) => (
          <Tabs.TabPane key={item.id} title={item.title}>
            <WordItem></WordItem>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  );
}
