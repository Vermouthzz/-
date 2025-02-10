import clsx from "clsx";
import { View } from "@tarojs/components";
export function TouchBlock({ className, startCallback, moveCallback }) {
  return (
    <View
      onTouchMove={(e) => moveCallback(e)}
      onTouchStart={(e) => startCallback(e)}
      className={clsx("line-border w-[16rpx] h-[16rpx] z-[52]", className)}
    ></View>
  );
}
