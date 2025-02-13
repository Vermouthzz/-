import { Image, Text, View } from "@tarojs/components";
// import Taro, { createSelectorQuery, useReady } from "@tarojs/taro";
import { useNavigation } from "../hooks/useNavigation";
export function CustomHeader({
  center,
  children,
  color = "#fff",
  title,
  className,
}) {
  const { height, pt } = useNavigation().navigationInfo;
  return (
    <View
      className={`${className} flex items-center relative`}
      style={{ height: `${height}px`, paddingTop: `${pt}px` }}
      id="custom-header"
    >
      <Image
        className="ml-3 w-2 h-2"
        src="/public/image/common/left.svg"
      ></Image>
      <Text
        className={`${center ? "-translate-x-1/2 left-1/2" : "ml-5"}`}
        style={{ color }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
