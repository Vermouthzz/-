import { Text, View } from "@tarojs/components";
// import { Icon } from "@nutui/icons-react-taro";
import { CurrentBook } from "./widgets/current-book";
export default function WordBookSwitch() {
  return (
    <View className="h-screen bg-gray-400">
      <CurrentBook></CurrentBook>
      {/*  */}
      <View className="px-2">
        <View className="flex justify-between items-center px-2 py-3">
          <Text>我的书桌</Text>
          <Text
            className="text-green-500 rounded-full border border-green-500 px-3 py-[4rpx]"
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
    <View className="rounded-md flex gap-2 bg-white p-3">
      <View className="w-16 h-24 bg-slate-600 rounded-md text-white font-semibold">
        考研
      </View>
      <View className="flex flex-col justify-between">
        <View className="flex flex-col gap-1">
          <Text className="text-[34rpx] font-medium">司机考纲词汇</Text>
          <View className="flex gap-2 items-center text-[26rpx] text-gray-400">
            <Text>已完成:</Text>
            <Text>2/1111词</Text>
          </View>
        </View>
        <View className="flex justify-between items-center">
          {/* <Icon name="del"></Icon> */}
          <View className="rounded-full px-2 py-1 bg-blue-700 text-white text-sm">
            学习此书
          </View>
        </View>
      </View>
    </View>
  );
}
