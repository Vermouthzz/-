import clsx from "clsx";
import { View } from "@tarojs/components";

export function TouchLine({ className, startCallback, moveCallback }) {
  return (
    <View
      onTouchStart={(e) => startCallback(e)}
      onTouchMove={(e) => moveCallback(e)}
      className={clsx(className, "line-border z-[52]")}
    ></View>
  );
}
