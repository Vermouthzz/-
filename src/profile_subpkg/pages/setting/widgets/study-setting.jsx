import { View, Text } from "@tarojs/components";
import { SettingItem } from "../components/setting-item";
import clsx from "clsx";

export function StudySetting({ className }) {
  return (
    <View className={clsx(className)}>
      <SettingItem text="学习时重复次数">
        <Text>2</Text>
      </SettingItem>
      <SettingItem text="学习时重复次数">
        <Text>2</Text>
      </SettingItem>
    </View>
  );
}
