import { View } from "@tarojs/components";
import { Tabs } from "@nutui/nutui-react-taro";
import { useMemo, useState } from "react";
import Taro, { useLoad } from "@tarojs/taro";

export default function WordCatePage() {
  const tabList = useMemo(() => {
    return [
      { title: "大学", id: 1, type: "" },
      { title: "高中", id: 2, type: "" },
      { title: "初中", id: 3, type: "" },
      { title: "小学", id: 4, type: "" },
    ];
  }, []);
  const [tab1value, setTab1value] = useState("0");

  useLoad(() => {});
  return (
    <View>
      <Tabs
        value={tab1value}
        onChange={(value) => {
          setTab1value(value);
        }}
        activeType="simple"
      >
        {tabList.map((item) => (
          <Tabs.TabPane key={item.id} title={item.title}>
            <BookItem></BookItem>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  );
}

function BookItem() {
  return (
    <View
      onClick={() =>
        Taro.navigateTo({ url: "/index_subpkg/pages/word-list/index" })
      }
    >
      BookItem
    </View>
  );
}
