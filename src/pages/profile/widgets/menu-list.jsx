import { Text, View } from "@tarojs/components";
import { ArrowRight } from "@nutui/icons-react-taro";

export function MenuList() {
  const list = [1, 2, 3];
  return (
    <View className="flex flex-col mt-3 bg-white">
      {list.map((item) => (
        <ListItem key={item}></ListItem>
      ))}
    </View>
  );
}

function ListItem() {
  return (
    <View className="flex items-center justify-between px-2 py-3">
      <Text>设置</Text>
      <ArrowRight size="32rpx" />
    </View>
  );
}
