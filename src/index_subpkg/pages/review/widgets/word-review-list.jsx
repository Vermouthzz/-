import React, { useState, useEffect, useRef } from "react";
import { WordItem } from "../../../components/word-item";
import { View } from "@tarojs/components";
import clsx from "clsx";
import { Empty } from "@nutui/nutui-react-taro";
import { useContext } from "../../../../hooks/immutable";
import { Context } from "../context";
import Taro from "@tarojs/taro";

export function WordReviewList({ list, className }) {
  const { setting } = useContext(Context);
  const voiceRef = useRef(null);

  const handleVoice = (url) => {
    voiceRef.current.src = url;
    voiceRef.current.play();
  };

  useEffect(() => {
    voiceRef.current = Taro.createInnerAudioContext();
  }, []);

  return (
    <View
      className={clsx(
        "w-full p-0 overflow-y-auto overflow-x-hidden",
        className
      )}
    >
      {list.length ? (
        list.map((item, index) => {
          return (
            <View className="mx-3">
              <WordItem
                showDesc={setting.showDesc}
                showWord={setting.showWord}
                key={index}
                item={item}
                index={index}
                handleVoice={handleVoice}
              ></WordItem>
            </View>
          );
        })
      ) : (
        <Empty description="暂无数据"></Empty>
      )}
    </View>
  );
}
