import { View } from "@tarojs/components";

export function Card({ title, children }) {
  return (
    <View
      className="w-11/12 mx-auto px-4 pt-3 pb-2 rounded-lg shadow-lg"
      style={{ background: "linear-gradient(135deg, #a8c6b9, #e5e0d2)" }}
    >
      <View className="text-primary text-xl font-semibold">{title}</View>
      <View>{children}</View>
    </View>
  );
}
