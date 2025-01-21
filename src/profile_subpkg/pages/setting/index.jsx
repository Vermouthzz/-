import { View } from "@tarojs/components";
import { WordSetting } from "./widgets/word-setting";
import { StudySetting } from "./widgets/study-setting";
import { ReviewSetting } from "./widgets/review-setting";
import { DaySetting } from "./widgets/day-setting";
import { useLoad } from "@tarojs/taro";
import { useContext, useState } from "react";
import { Context } from "../../../context";
import Taro from "@tarojs/taro";

export default function Setting() {
  const [setting, setSetting] = useState({
    "word-setting": [{ text: "", value: "1" }],
    "study-setting": [],
    "review-setting": [],
    "day-setting": [],
  });
  const { settings } = useContext(Context);

  useLoad(() => {
    const storgeSetting = Taro.getStorageSync("setting");
    if (storgeSetting) {
      const settingParse = JSON.parse(storgeSetting);
      setSetting(settingParse);
    } else {
      Taro.setStorageSync("setting", JSON.stringify(setting));
    }
  });
  return (
    <View className="h-screen">
      <View className="bg-[#F8F8F8]">
        <WordSetting
          list={setting["word-setting"]}
          className="mb-2"
        ></WordSetting>

        <StudySetting
          list={setting["study-setting"]}
          className="mb-2"
        ></StudySetting>
        <ReviewSetting
          list={setting["review-setting"]}
          className="mb-2"
        ></ReviewSetting>
        <DaySetting list={setting["day-setting"]}></DaySetting>
      </View>
    </View>
  );
}
