import { Check } from "@nutui/icons-react-taro";
import clsx from "clsx";
import { View } from "@tarojs/components";

export function CommonItem({ children, className }) {
  return (
    <View
      className={clsx(
        className,
        "flex justify-between items-center rounded-md border-b border-[#ccc]"
      )}
    >
      <Check />
      {children}
      <Check />
    </View>
  );
}
