import { Text, View, Input } from "@tarojs/components";
import { VolumeMax, IconFont } from "@nutui/icons-react-taro";
import { Button } from "@nutui/nutui-react-taro";
import { useEffect, useMemo, useRef, useState } from "react";
import Taro, { useLoad } from "@tarojs/taro";
import { useContext } from "../../../../hooks/immutable";
import { Context } from "../context";
import { Context as IndexContext } from "../../../../context";

export function WordWrite({
  list: wordList,
  currentIndex,
  changeIndex,
  updateList,
}) {
  console.log(currentIndex, "------------");

  const { type } = useContext(Context);
  const voiceRef = useRef(null);
  const [result, setResult] = useState([""]);

  useEffect(() => {
    if (wordList.length) {
      if (wordList[currentIndex].isAnswered) {
        setResult(wordList[currentIndex].word);
      } else {
        setResult("");
      }
    }
  }, [currentIndex, wordList]);

  const switchWord = (type) => {
    if (type === "prev") {
      if (currentIndex === 0) return;
      changeIndex((prev) => prev - 1);
    } else {
      if (currentIndex === wordList.length - 1) return;
      changeIndex((prev) => prev + 1);
    }
  };

  const [isTips, setIsTips] = useState(false);

  useEffect(() => {
    if (type === "listen") {
      setIsTips(false);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (type === "spell") {
      setIsTips(true);
    } else {
      voiceRef.current = Taro.createInnerAudioContext();
      voiceRef.current.src = wordList[currentIndex].voice;
    }
  }, [type]);

  const handleTips = () => {
    console.log(111111, isTips);
    if (type === "listen") {
      setIsTips(true);
    } else {
      voiceRef.current.play();
    }
  };

  const playVoice = () => {
    voiceRef.current.play();
  };

  const confirmResult = () => {
    if (wordList[currentIndex].isAnswered) {
      Taro.showToast({
        title: "已作答",
        icon: "none",
      });
      return;
    }
    const trueValue = wordList[currentIndex].word;
    const correct = trueValue === result;
    updateList((prev) => {
      const newWordList = [...prev];
      newWordList[currentIndex].isAnswered = true;
      newWordList[currentIndex].isCorrect = correct;
      newWordList[currentIndex].myAnswered = result;
      return newWordList;
    });
  };

  return (
    <View className="flex flex-col items-center">
      <View className="mb-4 flex gap-2 items-center justify-center bg-red-300">
        <Input
          value={result}
          onInput={(e) => {
            setResult(e.detail.value);
          }}
          style={{ letterSpacing: "6rpx" }}
          className="border-b border-black flex-1 text-center"
        ></Input>
        {wordList[currentIndex] && wordList[currentIndex].isAnswered && (
          <CustomResult flag={wordList[currentIndex].isCorrect} />
        )}
      </View>
      <View className="flex rounded-full py-1 bg-[#eee] px-3 items-center">
        <VolumeMax color="#559B83" onClick={playVoice} />
        <Text className="text-[#559B83] ml-2" onClick={handleTips}>
          提示
        </Text>
      </View>
      {isTips ? (
        <View className="mt-10 w-4/5 mx-auto text-center">
          {wordList[currentIndex] && wordList[currentIndex].mean}
        </View>
      ) : null}

      <Footer updateIndex={switchWord} confirmResult={confirmResult}></Footer>
    </View>
  );
}

function InputItem({
  changeResult,
  value,
  result,
  index,
  focusedIndex,
  changeIndex,
  maxIndex,
}) {
  const handleChange = (e) => {
    console.log(e.detail, "输入框");
    let { value, keyCode } = e.detail;
    const prev = result[index];
    let newIndex = index;

    if (keyCode === 8) {
      // 删除字符逻辑
      changeResult((prev) => {
        const newResult = [...prev];
        // 如果当前输入框为空，则删除前一个输入框的内容
        if (index > 0 && !value) {
          newResult[index - 1] = "";
        } else {
          newResult[index] = "";
        }
        return newResult;
      });

      // 移动到前一个输入框
      if (index > 0) {
        changeIndex(index - 1);
      }
      return;
    }

    if (prev && keyCode !== 8) {
      value = prev.length < value.length ? value.slice(-1) : value;
      newIndex =
        prev.length < value.length ? index : Math.min(index + 1, maxIndex);
    }

    changeResult((prev) => {
      const newResult = [...prev];
      newResult[newIndex] = value;
      return newResult;
    });

    if (value && focusedIndex === index) {
      changeIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  };

  return (
    <View className="w-5">
      <Input
        className="p-0 text-center"
        value={value}
        focus={focusedIndex === index}
        onInput={handleChange}
        maxLength={1}
        type="text"
      />
    </View>
  );
}

function CustomResult({ flag }) {
  return flag ? (
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
      size={"28"}
      color="red"
    />
  );
}

function LineItem() {
  return <View className="h-[4rpx] w-5 bg-slate-600"></View>;
}

// function WordDefinition() {
//   return <View className="mt-10">n.天使;爱人</View>;
// }

function Footer({ updateIndex, confirmResult }) {
  return (
    <View className="flex justify-between w-4/5 fixed bottom-32">
      <Button type="default" onClick={() => updateIndex("prev")}>
        上一个
      </Button>
      <Button type="default" onClick={confirmResult}>
        确认
      </Button>
      <Button type="default" onClick={() => updateIndex("next")}>
        下一个
      </Button>
    </View>
  );
}
