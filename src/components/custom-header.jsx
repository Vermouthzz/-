import { Image, Text, View } from "@tarojs/components";
// import Taro, { createSelectorQuery, useReady } from "@tarojs/taro";
import { useNavigation } from "../hooks/useNavigation";
import { ArrowLeft } from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";
export function CustomHeader({
  center,
  children,
  color = "#fff",
  arrowColor = "black",
  title,
  className,
}) {
  const { height, pt } = useNavigation().navigationInfo;
  return (
    <View
      className={`${className} flex items-center relative pl-3`}
      style={{ height: `${height}px`, paddingTop: `${pt}px` }}
      id="custom-header"
    >
      <ArrowLeft
        color={arrowColor}
        size={20}
        onClick={() => {
          Taro.navigateBack();
        }}
      />
      <Text
        className={`${center ? "-translate-x-1/2 left-1/2 absolute" : "ml-5"}`}
        style={{ color }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
}
