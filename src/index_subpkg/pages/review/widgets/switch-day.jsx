import { Text, View } from "@tarojs/components";
import { PlayDoubleBack, PlayDoubleForward } from "@nutui/icons-react-taro";
import { Popover, Checkbox } from "@nutui/nutui-react-taro";
import { useState } from "react";

const optionsList = [
  {
    key: "key1",
    name: "显示单词",
  },
  {
    key: "key2",
    name: "显示释义",
  },
  {
    key: "key3",
    name: "全部显示",
  },
];

export function SwitchDay() {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <View className="flex items-center mt-3 px-3 justify-between relative">
      <SwitchItem></SwitchItem>
      <View></View>
      <Popover
        visible={showOptions}
        onClick={() => {
          showOptions ? setShowOptions(false) : setShowOptions(true);
        }}
        location="bottom-start"
      >
        <OptionsButton shape="square" onClick={setShowOptions}>
          复习配置
        </OptionsButton>
        {showOptions ? (
          <View>
            <Checkbox.Group labelPosition="left" defaultValue={["1"]}>
              {optionsList.map((item) => (
                <Checkbox key={item.key} value="1" label={item.name} />
              ))}
            </Checkbox.Group>
          </View>
        ) : null}
      </Popover>
    </View>
  );
}

function SwitchItem() {
  return (
    <View className="flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
      <PlayDoubleBack color="rgb(22, 163, 74)" />
      <Text className="text-green-600">Day 10</Text>
      <PlayDoubleForward color="rgb(22, 163, 74)" />
    </View>
  );
}

function OptionsButton({ children, onClick }) {
  return (
    <View className="text-gray-300" onClick={() => onClick(true)}>
      {children}
    </View>
  );
}
