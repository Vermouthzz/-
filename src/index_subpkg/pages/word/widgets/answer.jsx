import { Text, View } from "@tarojs/components";
import { IconFont } from "@nutui/icons-react-taro";
import clsx from "clsx";
import { useContext } from "../../../../hooks/immutable";
import { WordContext } from "../context";
import Taro from "@tarojs/taro";
import { useState } from "react";
import { updateWordStudy } from "../../../../api/word";

export function Answer({ className }) {
  const { wordInfo } = useContext(WordContext);
  return (
    <View className={clsx(className, "flex flex-col gap-2 w-11/12 mx-auto")}>
      {wordInfo.meanList.length
        ? wordInfo.meanList.map((item) => (
            <WordBlock key={item.mean} item={item} />
          ))
        : null}
    </View>
  );
}

function WordBlock({ item }) {
  const {
    wordInfo: { word },
  } = useContext(WordContext);
  const [showOptionsInfo, setShowOptionsInfo] = useState({
    show: false,
    isCorrect: false,
  });
  const answerWord = async (is_correct) => {
    try {
      const res = await updateWordStudy({
        word_id: word.id,
        book_id: 1,
        is_correct,
      });
      console.log(res, "study");
    } catch (error) {
      console.log(error);
    }
  };
  const selectOption = () => {
    const isCorrect = item.id === word.id;
    console.log("是否正确", isCorrect);

    setShowOptionsInfo({
      show: true,
      isCorrect,
    });
    answerWord(isCorrect);
    setTimeout(() => {
      Taro.navigateTo({
        url: `/index_subpkg/pages/word-detail/index?id=${word.id}&show=${true}`,
      });
    }, 1000);
  };
  return (
    <View
      onClick={selectOption}
      className="p-3 bg-[#2B823A] flex flex-col shadow-sm"
      hoverClass="opacity-80"
    >
      <Text className="text-xs">{item.part}</Text>
      <View className="flex gap-2">
        <View className="line-clamp-2 flex-1">{item.mean}</View>
        {showOptionsInfo.show ? (
          <View>
            {showOptionsInfo.isCorrect ? (
              <IconFont
                fontClassName="iconfont"
                classPrefix="icon"
                name="zhengque"
                size={"28"}
                color="green"
              />
            ) : (
              <IconFont
                fontClassName="iconfont"
                classPrefix="icon"
                name="cuowu"
                size={"32"}
                color="red"
              />
            )}
          </View>
        ) : null}
      </View>
    </View>
  );
}
