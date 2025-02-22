import { Text, View } from "@tarojs/components";
// import { CustomHeader } from "../../components/custom-header";
import { Answer } from "./widgets/answer";
import { useSafeInfo } from "../../../hooks/useSystemInfo";
import { WordVerify } from "./widgets/word-verify";

export default function WordPage() {
  const { safeBtm } = useSafeInfo().systemInfo;

  return (
    <View
      className="h-screen flex flex-col"
      style={{ background: "linear-gradient(to bottom, #ff6506, #ff9f43)" }}
    >
      {/* <CustomHeader></CustomHeader> */}
      <View className="flex-1 flex flex-col items-center justify-around">
        <Text className="text-white">1/10</Text>
        <WordVerify></WordVerify>
        <Answer className=""></Answer>
      </View>
      <Footer
        style={{ height: `${safeBtm + 100}px`, paddingBottom: `${safeBtm}px` }}
      ></Footer>
    </View>
  );
}

function Footer({ className, ...props }) {
  return (
    <View {...props} className="w-full">
      <View className="flex items-center justify-center py-2 mb-4 relative">
        看答案
        <View className="w-3 h-1 rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 bg-red-600"></View>
      </View>
      <View className="flex items-center">
        <View className="flex-1 text-center">1</View>
        <View className="flex-1 text-center">2</View>
        <View className="flex-1 text-center">3</View>
        <View className="flex-1 text-center">收藏</View>
      </View>
    </View>
  );
}
