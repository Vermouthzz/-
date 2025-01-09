import { Text, View } from "@tarojs/components";
import { SettingItem } from "../components/setting-item";
import clsx from "clsx";

export function WordSetting({ className, settingList }) {
  return (
    <View className={clsx(className)}>
      <SettingItem text="每组单词数量">
        <Text>10</Text>
      </SettingItem>
    </View>
  );
}
