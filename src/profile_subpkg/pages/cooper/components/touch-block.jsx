import clsx from "clsx";
import { View } from "@tarojs/components";
export function TouchBlock({ type, className, startCallback }) {
  return (
    <View
      // onTouchMove={(e) => moveCallback(e)}
      onTouchStart={(e) => startCallback(e, type)}
      className={clsx("line-border w-[24rpx] h-[24rpx] z-[52]", className)}
    ></View>
  );
}
