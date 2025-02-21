import { Text, View } from "@tarojs/components";

export default function WordBookSwitch() {
  return (
    <View className="">
      <View></View>
      <View className="">
        <View className="flex justify-between items-center">
          <Text>我的书桌</Text>
          <Text
            className=""
            onClick={() =>
              Taro.navigateTo({
                url: "/index_subpkg/pages/word-category/index?type=add",
              })
            }
          >
            添加新书
          </Text>
        </View>
        <View className="">
          <BookNo></BookNo>
        </View>
      </View>
    </View>
  );
}

function BookNo() {
  return (
    <View className="rounded-md bg-white p-3">
      <View></View>
      <View className="flex flex-col justify-between">
        <View className="flex flex-col gap-2">
          <Text className="text-lg font-bold">书桌空空如也</Text>
          <View className="flex items-center gap-2">
            <Text>已完成:</Text>
            <Text>0/2002词</Text>
          </View>
        </View>
        <View className="flex justify-between items-center">
          <Icon name="del"></Icon>
          <View className="rounded-full px-2 py-1 bg-blue-700 text-white">
            学习此书
          </View>
        </View>
      </View>
    </View>
  );
}
