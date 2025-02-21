import { Text, View, Input } from "@tarojs/components";
import { VolumeMax } from "@nutui/icons-react-taro";
import { Button } from "@nutui/nutui-react-taro";
import { useEffect, useRef, useState } from "react";
import { useLoad } from "@tarojs/taro";

export function WordWrite() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState([""]);
  const [wordList, setWordList] = useState([]);
  const [inputIndex, setInputIndex] = useState(0);

  useEffect(() => {
    if (wordList.length) {
      setResult(new Array(wordList[currentIndex].word.length).fill(""));
      setInputIndex(0); // 重置输入索引
    }
  }, [currentIndex, wordList]);

  const switchWord = (type) => {
    if (type === "prev") {
      if (currentIndex === 0) return;
      setCurrentIndex((prev) => prev - 1);
    } else {
      if (currentIndex === wordList.length - 1) return;
      setCurrentIndex((prev) => prev + 1);
    }
  };

  useLoad(() => {
    // 获取单词列表
    setWordList([
      { word: "apple", definition: "n.苹果" },
      { word: "banana", definition: "n.香蕉" },
      { word: "orange", definition: "n.橙子" },
    ]);
  });
  return (
    <View className="flex flex-col items-center">
      <View className="mb-4">
        <View className="flex gap-1 justify-center">
          {result.map((item, index) => (
            <InputItem
              key={index}
              value={result[index]}
              changeResult={setResult}
              changeIndex={setInputIndex}
              index={index}
              focusedIndex={inputIndex}
              maxIndex={result.length - 1}
            />
          ))}
        </View>
        <View className="flex gap-1 justify-center">
          {result.map((item, index) => (
            <LineItem key={index}></LineItem>
          ))}
        </View>
      </View>
      <View className="flex rounded-full py-1 bg-[#eee] px-3 items-center">
        <VolumeMax color="#559B83" />
        <Text className="text-[#559B83] ml-2">提示</Text>
      </View>
      <View className="mt-10">
        {wordList[currentIndex] && wordList[currentIndex].definition}
      </View>

      <Footer updateIndex={switchWord}></Footer>
    </View>
  );
}

function InputItem({
  changeResult,
  value,
  index,
  focusedIndex,
  changeIndex,
  maxIndex,
}) {
  const handleChange = (e) => {
    console.log(e);
    const { value, keyCode } = e.detail;
    changeResult((prev) => {
      const newResult = [...prev];
      newResult[index] = value;
      return newResult;
    });

    // // 输入后自动跳转下一个输入框
    if (value && focusedIndex === index) {
      changeIndex((prev) => Math.min(prev + 1, maxIndex));
    }
    if (keyCode === 8) {
      //删除字符
      changeIndex((prev) => Math.max(prev - 1, 0));
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

function LineItem() {
  return <View className="h-[4rpx] w-5 bg-slate-600"></View>;
}

// function WordDefinition() {
//   return <View className="mt-10">n.天使;爱人</View>;
// }

function Footer({ updateIndex }) {
  return (
    <View className="flex justify-between w-4/5 fixed bottom-32">
      <Button type="default" onClick={() => updateIndex("prev")}>
        上一个
      </Button>
      <Button type="default" onClick={() => updateIndex("next")}>
        下一个
      </Button>
    </View>
  );
}
