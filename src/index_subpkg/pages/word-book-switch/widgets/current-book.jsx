import { Image, Text, View } from "@tarojs/components";
import { useContext } from "react";
import { Context } from "../../../../context";

export function CurrentBook({ currentBook }) {
  return (
    <View className="flex flex-col gap-4 bg-white p-6">
      {/* header */}
      <View className="flex items-center gap-2">
        <Text className="font-medium text-2xl ">我的学习任务</Text>
        <View className="bg-green-500 text-sm text-white rounded-full px-1 -mt-2">
          正在学
        </View>
      </View>
      {/* content */}
      <BookBlock book={currentBook} />
    </View>
  );
}

function BookBlock({ book }) {
  const { settingState } = useContext(Context);
  return (
    <View className="flex gap-3 bg-white">
      <View className="w-20 h-28 bg-slate-600 rounded-md text-white font-semibold">
        <Image className="w-full h-full" src={book.img_url || ""}></Image>
      </View>
      <View className="flex flex-col justify-between flex-1">
        <View className="flex flex-col gap-2">
          <Text className="text-[34rpx]">{book.book_name || ""}</Text>
          <View className="flex gap-2 text-sm">
            <Text>每日新学{settingState["wordSetting"][0].value}词</Text>
            <Text className="">{book.total_count || 0}词</Text>
          </View>
        </View>
        <View className="flex gap-1 flex-col text-gray-400 text-[26rpx]">
          <View className="flex gap-2 items-center">
            <Text>已完成:</Text>
            <Text>
              {book.learned_count || 0}/{book.total_count || 0}词
            </Text>
          </View>
          <View className="bg-gray-400 relative h-[6rpx] w-full rounded-full">
            <View
              className="bg-green-500 absolute h-full top-0 left-0"
              style={{
                width: `${(book.learned_count / book.total_count) * 100}%`,
              }}
            ></View>
          </View>
        </View>
      </View>
    </View>
  );
}
