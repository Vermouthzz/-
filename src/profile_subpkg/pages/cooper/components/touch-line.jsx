import clsx from "clsx";
import { View } from "@tarojs/components";

export function TouchLine({ type, className, startCallback }) {
  return (
    <View
      onTouchStart={(e) => startCallback(e, type)}
      // onTouchMove={(e) => moveCallback(e)}
      className={clsx(className, "line-border z-[52]")}
    ></View>
  );
}
