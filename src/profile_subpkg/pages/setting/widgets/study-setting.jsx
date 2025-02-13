import { View, Text } from "@tarojs/components";
import { CommonLine } from "../../../components/common-line";
import clsx from "clsx";
import { RightWidget } from "../components/right-widget";

export function StudySetting({ className, list }) {
  return (
    <View className={clsx(className)}>
      {list.map((item) => (
        <CommonLine text={item.text} key={item.text}>
          {item.renderType ? (
            <RightWidget type={"studySetting"} item={item}></RightWidget>
          ) : (
            <View>{item.value}</View>
          )}
        </CommonLine>
      ))}
    </View>
  );
}
