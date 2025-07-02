import { Text, View } from "@tarojs/components";
import { useContext } from "react";
import { Context } from "../context";
import { IconFont } from "@nutui/icons-react-taro";
import clsx from "clsx";

export function InteractionResult({ className }) {
  const { finishInfo } = useContext(Context);
  const list = [1, 2, 3, 4];
  return (
    <View
      className={clsx(
        "rounded-md p-3 flex flex-col gap-3 bg-[#546EDC] overflow-scroll",
        className
      )}
    >
      {finishInfo.resultList.map((item) => (
        <ResultItem key={item.word} item={item}>
          {/* <View className="flex flex-col items-center">
            <Text className="text-white text-lg">{item.word}</Text>
            <Text className="text-[#eee] text-sm text-center line-clamp-2">
              {item.mean}
            </Text>
          </View> */}
        </ResultItem>
      ))}
    </View>
  );
}

function ResultItem({ item }) {
  return (
    // <View className="flex justify-between items-center py-3 border-b border-[#ccc]">
    //   <CustomResult flag={myAns} />
    //   {children}
    //   <CustomResult flag={otherAns} />
    // </View>
    <View
      className={`flex items-center justify-between p-3 rounded-lg ${
        item.answerResult ? "bg-green-50" : "bg-red-50"
      }`}
    >
      <View>
        <View className="font-medium">{item.word}</View>
        <View className="text-sm text-gray-500">{item.mean}</View>
      </View>
      <CustomResult flag={item.answerResult} />
    </View>
  );
}

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
