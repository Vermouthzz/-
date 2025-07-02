import { View } from "@tarojs/components";
import { ScrollPaging } from "../../../components/scroll-paging";
import { WordItem } from "../../../components/word-item";
import { useState } from "react";
import { getCollectWordAPI } from "../../../api/word";
import { useDidShow } from "@tarojs/taro";

export default function RawWordsPage() {
  const [wordList, setWordList] = useState([]);
  const getWordList = async (data) => {
    console.log(data);

    try {
      const res = await getCollectWordAPI(data);
      console.log(res);

      if (res.code === 200) {
        setWordList((prev) => [...prev, ...res.data.list]);
      }
    } catch (error) {}
  };
  const uploadMore = (currentPage, pageSize) => {
    getWordList({ currentPage, pageSize });
  };

  // useDidShow(() => {
  //   getWordList({ currentPage: 1, pageSize: 12 });
  // });

  return (
    <View className="h-screen">
      <ScrollPaging
        list={wordList}
        className={"h-full"}
        pageSize={12}
        uploadMore={uploadMore}
      >
        <View className="px-3">
          {wordList.length
            ? wordList.map((item, index) => (
                <WordItem key={item.word_id} index={index} item={item} />
              ))
            : null}
        </View>
      </ScrollPaging>
    </View>
  );
}
