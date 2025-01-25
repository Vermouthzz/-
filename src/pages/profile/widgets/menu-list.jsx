import { Text, View } from "@tarojs/components";
import { ArrowRight } from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";

export function MenuList() {
  const list = [
    {
      name: "设置",
      path: "/profile_subpkg/pages/setting/index",
    },
    {
      name: "主题",
      path: "/profile_subpkg/pages/theme/index",
    },
  ];
  return (
    <View className="flex flex-col mt-3 bg-white">
      {list.map((item, index) => (
        <ListItem key={index} item={item}></ListItem>
      ))}
    </View>
  );
}

function ListItem({ item }) {
  return (
    <View
      className="flex items-center justify-between px-2 py-3"
      onClick={() => {
        Taro.navigateTo({
          url: item.path,
        });
      }}
    >
      <Text>{item.name}</Text>
      <ArrowRight size="32rpx" />
    </View>
  );
}
