import { Text, View } from "@tarojs/components";
import clsx from "clsx";

export function CommonBlock({ title, children, className }) {
  return (
    <View
      className={clsx(
        "rounded-md py-4 px-2 bg-white opacity-50 shadow-md",
        className
      )}
    >
      <Text>{title}</Text>
      <View>{children}</View>
    </View>
  );
}
