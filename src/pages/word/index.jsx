import { Text, View } from "@tarojs/components";
import { CustomHeader } from "../../components/custom-header";
import { Answer } from "./widgets/answer";
import { useSafeInfo } from "../../hooks/useSystemInfo";
import { WordVerify } from "./widgets/word-verify";

export default function WordPage() {
  const { safeBtm } = useSafeInfo().systemInfo;

  return (
    <View
      className="h-screen relative"
      style={{ background: "linear-gradient(to bottom, #ff6506, #ff9f43)" }}
    >
      <CustomHeader></CustomHeader>
      <Text className="text-white absolute top-6 left-1/2 -translate-x-1/2">
        1/10
      </Text>
      <WordVerify></WordVerify>
      <Answer></Answer>
      <Footer
        style={{ height: `${safeBtm + 60}px`, paddingBottom: `${safeBtm}px` }}
      ></Footer>
    </View>
  );
}

function Footer({ className, ...props }) {
  return (
    <View {...props} className="flex items-center fixed bottom-0 left-0 w-full">
      <View className="flex-1 text-center">1</View>
      <View className="flex-1 text-center">2</View>
      <View className="flex-1 text-center">3</View>
      <View className="flex-1 text-center">4</View>
    </View>
  );
}
