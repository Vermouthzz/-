import { Text, View } from "@tarojs/components";
import { Card } from "../components/card";
import Taro from "@tarojs/taro";

export function WordBook() {
  const goToWord = () => {
    Taro.navigateTo({
      url: "/index_subpkg/pages/word-category/index",
    });
  };
  return (
    <Card title={"每日任务"}>
      <View className="flex mt-3">
        <View className="flex flex-col w-60 items-center">
          <View
            onClick={goToWord}
            className="w-20 h-28 bg-slate-600 rounded-md text-white font-semibold -ml-3 mb-1"
          >
            考研
          </View>
          <Text className="text-[22rpx]">点击词书可以进行切换哦</Text>
        </View>
        <View className="flex flex-wrap">
          {[1, 2, 3, 4].map((item) => (
            <View
              hoverClass="bg-gray-500"
              key={item}
              className="flex flex-col gap-2 py-1 pl-3 pr-8 rounded-lg"
            >
              <Text>已学习</Text>
              <View className="flex items-center">
                <Text className="font-semibold text-xl">175</Text>
                <Text>词</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
      <Button
        type="primary"
        className="py-1 rounded-full w-40 mx-auto"
        block
        onClick={() => {
          Taro.navigateTo({
            url: "/index_subpkg/pages/word-category/index",
          });
        }}
      >
        开始学习
      </Button>
    </Card>
  );
}
