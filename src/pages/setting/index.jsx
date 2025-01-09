import { View } from "@tarojs/components";
import { CustomHeader } from "../../components/custom-header";
import { WordSetting } from "./widgets/word-setting";
import { StudySetting } from "./widgets/study-setting";
import { ReviewSetting } from "./widgets/review-setting";
import { DaySetting } from "./widgets/day-setting";

export default function Setting() {
  const setting = {
    "word-setting": [{ text: "", value: "1" }],
    "study-setting": [],
    "review-setting": [],
    "day-setting": [],
  };
  return (
    <View className="h-screen">
      <CustomHeader title={"设置"}></CustomHeader>
      <View className="bg-[#F8F8F8]">
        <WordSetting className="mb-2"></WordSetting>
        <StudySetting className="mb-2"></StudySetting>
        <ReviewSetting className="mb-2"></ReviewSetting>
        <DaySetting></DaySetting>
      </View>
    </View>
  );
}
