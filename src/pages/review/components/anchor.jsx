import { Text, View } from "@tarojs/components";
import clsx from "clsx";

export function Anchor({ icon, text, className }) {
  return (
    <View className={clsx(className, "flex flex-col gap-1 items-center")}>
      {icon}
      <Text className="text-sm">{text}</Text>
    </View>
  );
}
