import { View } from "@tarojs/components";
import { SettingItem } from "../components/setting-item";
import { clsx } from "clsx";

export function ReviewSetting({ className }) {
  return (
    <View className={clsx(className)}>
      <SettingItem text="复习时重复次数"></SettingItem>
      <SettingItem text="复习时重复次数"></SettingItem>
    </View>
  );
}
