import { View } from "@tarojs/components";
import clsx from "clsx";

export function SearchResult({ className }) {
  return <View className={clsx(className, "bg-white absolute")}></View>;
}

function ResultItem() {
  return <View className="flex p-2"></View>;
}
