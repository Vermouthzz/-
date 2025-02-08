import { View } from "@tarojs/components";
import { CommonLine } from "../../../components/common-line";
import { RightWidget } from "../components/right-widget";
import { clsx } from "clsx";

export function ReviewSetting({ className, list }) {
  return (
    <View className={clsx(className)}>
      {list.map((item) => (
        <CommonLine text={item.text} key={item.text}>
          {item.renderType ? (
            <RightWidget type={"reviewSetting"} item={item}></RightWidget>
          ) : (
            <View>{item.value}</View>
          )}
        </CommonLine>
      ))}
    </View>
  );
}
