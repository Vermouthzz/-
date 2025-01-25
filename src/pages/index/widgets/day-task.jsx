import { Text, View } from "@tarojs/components";
import { Card } from "../components/card";

export function DayTask() {
  return (
    <Card title={"每日任务"}>
      <View className="flex mt-3 justify-between px-4">
        <View className="rounded-full bg-pink-600 w-[7.5rem] h-[7.5rem] flex items-center justify-center">
          <View className="rounded-full bg-white flex flex-col items-center justify-center w-24 h-24">
            <View>
              <Text>10</Text>
              <Text>/10</Text>
            </View>
            <Text className="text-xs">今日已学习</Text>
          </View>
        </View>
        <View className="rounded-full bg-pink-600 w-[7.5rem] h-[7.5rem] flex items-center justify-center">
          <View className="rounded-full bg-white flex flex-col items-center justify-center w-24 h-24">
            <View>
              <Text>10</Text>
              <Text>/10</Text>
            </View>
            <Text className="text-xs">今日已学习</Text>
          </View>
        </View>
      </View>
    </Card>
  );
}
