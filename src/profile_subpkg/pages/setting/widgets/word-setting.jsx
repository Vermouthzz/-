import { Text, View } from "@tarojs/components";
import { CommonLine } from "../../../components/common-line";
import clsx from "clsx";

export function WordSetting({ className, settingList }) {
  return (
    <View className={clsx(className)}>
      <CommonLine text="每组单词数量">
        <Text>10</Text>
      </CommonLine>
    </View>
  );
}
