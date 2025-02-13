import { View } from "@tarojs/components";
import { CommonLine } from "../../../components/common-line";
import { RightWidget } from "../components/right-widget";

export function DaySetting({ list }) {
  console.log(list, "day-setting");

  return (
    <View>
      {list.map((item) => (
        <CommonLine text={item.text} key={item.text}>
          {item.renderType ? (
            <RightWidget type={"daySetting"} item={item}></RightWidget>
          ) : (
            <View>{item.value}</View>
          )}
        </CommonLine>
      ))}
    </View>
  );
}
