import { Text, View } from "@tarojs/components";
import { Check } from "@nutui/icons-react-taro";

export function InteractionResult() {
  const list = [1, 2, 3, 4];
  return (
    <View className="rounded-md p-3 bg-[#546EDC]">
      {list.map((item) => (
        <ResultItem key={item}>
          <View className="flex flex-col items-center">
            <Text className="text-white text-lg">Angle</Text>
            <Text className="text-[#eee] text-sm">天使</Text>
          </View>
        </ResultItem>
      ))}
    </View>
  );
}

function ResultItem({ children }) {
  return (
    <View className="flex justify-between items-center py-3 border-b border-[#ccc]">
      <Check />
      {children}
      <Check />
    </View>
  );
}
