import { IconFont } from "@nutui/icons-react-taro";
import clsx from "clsx";
import { View } from "@tarojs/components";

export function CommonItem({ children, className }) {
  return (
    <View
      hoverClass="bg-[#f5f5f5]"
      className={clsx(
        className,
        "flex justify-between items-center rounded-md border-b border-[#ccc]"
      )}
    >
      <IconFont fontClassName="iconfont" classPrefix="icon" name="zhengque" size={"28"} color="green" />
      {children}
      <IconFont fontClassName="iconfont" classPrefix="icon" name="cuowu" size={"32"} color="red" />
    </View>
  );
}
