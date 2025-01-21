import { View } from "@tarojs/components";
import clsx from "clsx";

export function SearchResult({ className }) {
  return (
    <View
      className={clsx(className, "bg-green-300 absolute h-80 w-full top-12")}
    ></View>
  );
}

function ResultItem() {
  return <View className="flex p-2"></View>;
}
