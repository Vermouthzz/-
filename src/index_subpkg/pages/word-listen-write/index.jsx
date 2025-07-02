import { Text, View } from "@tarojs/components";
import { WordWrite } from "./widgets/word-write";
import { useEffect, useMemo, useState } from "react";
import { useLoad } from "@tarojs/taro";
import { getReviewWordAPI } from "../../../api/word";
import { useContext, useDispatch, withContext } from "../../../hooks/immutable";
import { Context } from "./context";
import { ListResult } from "./widgets/list-result";

export default withContext(Context, WordListenWritePage);

function WordListenWritePage() {
  const [wordList, setWordList] = useState([]);
  const { type } = useContext(Context);
  const dispatch = useDispatch(Context);

  const [currentIndex, setCurrentIndex] = useState(0);

  const showResult = useMemo(() => {
    return wordList.every((item) => item.isAnswered);
  }, [wordList]);

  useLoad((options) => {
    if ("args" in options) {
      const { list: wordList, type } = JSON.parse(
        decodeURIComponent(options.args)
      );
      
      setWordList((prev) =>
        wordList.map((item) => ({
          ...item,
          isCorrect: false,
          isAnswered: false,
          myAnswered: "",
        }))
      );
      dispatch((prev) => ({ ...prev, type }));
    }
  });
  return (
    <View className="h-full flex flex-col">
      {showResult ? (
        <ListResult wordList={wordList} />
      ) : (
        <>
          <Text className="mx-auto mt-10 mb-6">
            {currentIndex + 1}/{wordList.length}
          </Text>
          <WordWrite
            list={wordList}
            updateList={setWordList}
            currentIndex={currentIndex}
            changeIndex={setCurrentIndex}
          ></WordWrite>
        </>
      )}
    </View>
  );
}
