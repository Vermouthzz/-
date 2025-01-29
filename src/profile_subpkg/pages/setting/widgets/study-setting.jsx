import { View, Text } from "@tarojs/components";
import { CommonLine } from "../../../components/common-line";
import clsx from "clsx";

export function StudySetting({ className }) {
  return (
    <View className={clsx(className)}>
      <CommonLine text="学习时重复次数">
        <Text>2</Text>
      </CommonLine>
      <CommonLine text="学习时重复次数">
        <Text>2</Text>
      </CommonLine>
    </View>
  );
}
