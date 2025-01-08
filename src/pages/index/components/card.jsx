import { View } from "@tarojs/components";

export function Card({ title, children }) {
  return (
    <View className="w-11/12 mx-auto px-4 pt-3 pb-2 rounded-lg bg-yellow-500 shadow-lg">
      <View className="text-primary text-xl font-semibold">{title}</View>
      <View>{children}</View>
    </View>
  );
}
