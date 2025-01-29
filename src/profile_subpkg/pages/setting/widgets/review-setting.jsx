import { View } from "@tarojs/components";
import { CommonLine } from "../../../components/common-line";

import { clsx } from "clsx";

export function ReviewSetting({ className }) {
  return (
    <View className={clsx(className)}>
      <CommonLine text="复习时重复次数"></CommonLine>
      <CommonLine text="复习时重复次数"></CommonLine>
    </View>
  );
}
