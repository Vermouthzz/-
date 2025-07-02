import { Text, View } from "@tarojs/components";
import clsx from "clsx";

export function Anchor({ item, className, cliclCallback }) {
  return (
    <View
      className={clsx(className, "flex flex-col gap-1 items-center")}
      onClick={() => cliclCallback(item.type)}
    >
      {item.icon}
      <Text className="text-sm">{item.text}</Text>
    </View>
  );
}
