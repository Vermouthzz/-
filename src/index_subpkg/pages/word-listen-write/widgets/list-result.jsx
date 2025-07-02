import { View } from "@tarojs/components";
import { useState } from "react";
import { IconFont, More } from "@nutui/icons-react-taro";
import Taro from "@tarojs/taro";

export function ListResult({ wordList }) {
  const getCorrectRate = () => {
    if (wordList.length === 0) return "0% (0/0)";
    const correctCount = wordList.filter((record) => record.isCorrect).length;
    const percentage = Math.round((correctCount / wordList.length) * 100);
    return `${percentage}% (${correctCount}/${wordList.length})`;
  };
  const checkDetail = (item) => {
    console.log(item);

    Taro.navigateTo({
      url: "/index_subpkg/pages/word-detail/index" + "?id=" + item.id,
    });
  };
  return (
    <View className="">
      <View className="divide-y divide-gray-200">
        {wordList.map((record, index) => (
          <View key={index} className="p-4 flex items-center">
            <View className="flex-1">
              <View className="flex items-center space-x-2">
                <CustomResult flag={record.isCorrect} />
                <span className="font-medium">{record.word}</span>
              </View>
              <View className="text-sm text-gray-500 mt-1">
                你的答案：{record.myAnswered}
              </View>
            </View>
            <More onClick={() => checkDetail(record)} />
          </View>
        ))}
      </View>

      <View className="p-4 border-t border-gray-200 bg-gray-50">
        <View className="text-center text-gray-600">
          正确率：{getCorrectRate()}
        </View>
      </View>
    </View>
  );
}

const ListItem = () => {
  return <View className=""></View>;
};

function CustomResult({ flag }) {
  return flag ? (
    <IconFont
      fontClassName="iconfont"
      classPrefix="icon"
      name="zhengque"
      size={"28"}
      color="green"
    />
  ) : (
    <IconFont
      fontClassName="iconfont"
      classPrefix="icon"
      name="cuowu"
      size={"28"}
      color="red"
    />
  );
}
