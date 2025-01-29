import { View, Text } from "@tarojs/components";
import clsx from "clsx";

export function CommonLine({
  text = "单词重复",
  className,
  callback,
  children,
}) {
  return (
    <View
      onClick={callback}
      className={clsx(
        className,
        "flex items-center justify-between bg-white p-4 border-b border-[#eee]"
      )}
    >
      <Text>{text}</Text>
      {children}
    </View>
  );
}
