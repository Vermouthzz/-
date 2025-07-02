import { Image, Text, View } from "@tarojs/components";
import Taro, { useLoad, useUnload } from "@tarojs/taro";
import { VolumeMax } from "@nutui/icons-react-taro";
import { useEffect, useRef, useState } from "react";
import { useContext as useReactContext } from "react";
import { WordContext } from "../context";
import { Context } from "../../../../context";
import { useContext } from "../../../../hooks/immutable";

export function WordVerify() {
  const {
    wordInfo: { word },
  } = useContext(WordContext);
  const { settingState } = useReactContext(Context);
  const [repeatCount, setRepeatCount] = useState(
    settingState["studySetting"][0].value
  ); // 初始值从设置中获取
  const repeatCountRef = useRef(repeatCount); // 使用 ref 来追踪最新的值
  const audio = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 每次 repeatCount 更新时同步到 ref
  useEffect(() => {
    repeatCountRef.current = repeatCount;
  }, [repeatCount]);

  // 处理播放音频
  const handleVoice = () => {
    if (!isPlaying && word.voice) {
      setIsPlaying(true);
      audio.current.play();
    }
  };

  useEffect(() => {
    audio.current = Taro.createInnerAudioContext();
    audio.current.onEnded(() => {
      console.log("end   -----------");
      // 使用 ref 的当前值进行判断
      if (repeatCountRef.current > 1) {
        setRepeatCount((prev) => prev - 1); // 使用函数式更新确保状态准确
        audio.current.play(); // 重新播放
      } else {
        setIsPlaying(false);
        setRepeatCount(settingState["studySetting"][0].value); // 重置重复次数
      }
    });

    // 清理音频对象
    return () => {
      if (audio.current) {
        audio.current.destroy();
      }
    };
  }, [word]); // 添加 settingState 依赖，确保状态变化时重新初始化

  useEffect(() => {
    if (settingState) {
      const value = settingState["daySetting"][0].value;
      if (word.voice && audio.current) {
        audio.current.src = word.voice;
        if (value) {
          setIsPlaying(true);
          audio.current.play();
        }
      }
    }
  }, [word, settingState]); // 每次 word 变化时更新音频

  // useUnload(() => {
  //   if (audio.current) {
  //     audio.current.destroy();
  //   }
  // });

  return (
    <View className="flex flex-col items-center">
      <Text className="font-bold text-green-600 text-3xl">
        {word.word || ""}
      </Text>
      <View className="flex items-center gap-2">
        <Text>{word.symbols || ""}</Text>
        <VolumeMax onClick={handleVoice} color="#559B83" />
      </View>
    </View>
  );
}
