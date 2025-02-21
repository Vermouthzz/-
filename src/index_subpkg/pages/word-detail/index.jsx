import { View } from "@tarojs/components";
import { CustomHeader } from "../../../components/custom-header";
import { WordEnglish } from "./widgets/word-english";
import { WordChinese } from "./widgets/word-chinese";
import { WordTransform } from "./widgets/wrod-transform";

export default function WordDetail() {
  return (
    <View className="bg-gradient-to-b from-pink-500 to-white h-screen">
      <CustomHeader title={"单词详情"}></CustomHeader>
      <View className="flex flex-col px-2">
        <WordEnglish title="英文释义" className="mb-3"></WordEnglish>
        <WordChinese title="中文释义" className="mb-3"></WordChinese>
        <WordTransform title="词型变换" className="mb-3"></WordTransform>
      </View>
    </View>
  );
}
