import { Text, View } from "@tarojs/components";

export default function WordPage() {
  return (
    <View
      className="h-screen"
      style={{ background: "linear-gradient(to bottom, #ff6506, #ff9f43)" }}
    >
      <Text className="text-white">1/10</Text>
    </View>
  );
}

function Footer() {
  return (
    <View className="flex items-center">
      <View className="flex-1">1</View>
      <View className="flex-1">2</View>
      <View className="flex-1">3</View>
      <View className="flex-1">4</View>
    </View>
  );
}
