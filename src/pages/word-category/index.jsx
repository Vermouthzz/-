import { View } from "@tarojs/components";
import { Tabs } from "@nutui/nutui-react-taro";
import { useMemo, useState } from "react";
import { useLoad } from "@tarojs/taro";

export default function WordCatePage() {
  const tabList = useMemo(() => {
    return [
      { title: "大学", id: 1, type: "" },
      { title: "高中", id: 2, type: "" },
      { title: "初中", id: 3, type: "" },
      { title: "小学", id: 4, type: "" },
    ];
  }, []);

  useLoad(() => {
    // setTabList(...tabList);
  });
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
            {item.title}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  );
}
