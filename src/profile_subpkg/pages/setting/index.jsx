import { View } from "@tarojs/components";
import { WordSetting } from "./widgets/word-setting";
import { StudySetting } from "./widgets/study-setting";
import { ReviewSetting } from "./widgets/review-setting";
import { DaySetting } from "./widgets/day-setting";
import { useLoad, useUnload } from "@tarojs/taro";
import { useContext, useState } from "react";
import { Context } from "../../../context";
import Taro from "@tarojs/taro";

export default function Setting() {
  const { settingState, setSettingState } = useContext(Context);

  useLoad(() => {
    const setting = Taro.getStorageSync("settingState");
    // if(setting) {}
  });
  useUnload(() => {
    // Taro.setStorageSync("settingState", settingState);
  });
  return (
    <View className="h-screen">
      <View className="bg-[#F8F8F8]">
        <WordSetting
          list={settingState["wordSetting"]}
          className="mb-2"
        ></WordSetting>

        <StudySetting
          list={settingState["studySetting"]}
          className="mb-2"
        ></StudySetting>
        <ReviewSetting
          list={settingState["reviewSetting"]}
          className="mb-2"
        ></ReviewSetting>
        <DaySetting list={settingState["daySetting"]}></DaySetting>
      </View>
    </View>
  );
}
