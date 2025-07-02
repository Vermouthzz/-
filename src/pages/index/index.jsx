import { View, Text } from "@tarojs/components";
import Taro, { useDidShow } from "@tarojs/taro";
import "./index.css";
import { WordBook } from "./widgets/word-book";
import { InteractionEntry } from "./widgets/interaction-entry";
import { getInteractionInfo } from "../../api/interaction";
import { useContext, useState } from "react";
import { IndexContext, withContext } from "./context";
import { getBookPrecessAPI } from "../../api/word_book";
import { SearchBar } from "@nutui/nutui-react-taro";
import { initialState } from "./context";

export default withContext(Index);

function Index() {
  const { setInteractionInfo, setBookInfo } = useContext(IndexContext);
  const getInteraction = async () => {
    const res = await getInteractionInfo();
    if (res.code === 200) {
      console.log(res, "互动信息");
      setInteractionInfo((prev) => {
        return prev.map((item) => {
          if (res.data[item.type] !== undefined) {
            return {
              ...item,
              value: res.data[item.type],
            };
          }
        });
      });
    } else if (res.code === 401) {
      setInteractionInfo(initialState.interactionInfo);
    }
  };
  const getBookInfo = async () => {
    try {
      const res = await getBookPrecessAPI();
      console.log(res, "书籍信息");
      if (res.code === 200) {
        setBookInfo((prev) => ({
          ...prev,
          review_count: res.data.reviewCount,
          today_count: res.data.todayCount,
          totalCount: res.data.totalCount,
          progress: res.data.progress,
          learnedCount: res.data.learnedCount,
          book_name: res.data.bookInfo.book_name,
          ishave: true,
        }));
      } else if (res.code === 401) {
        setBookInfo(initialState.bookInfo);
      }
    } catch (error) {}
  };
  useDidShow(() => {
    getInteraction();
    getBookInfo();
  });

  // useDidShow(() => {
  //   console.log("Page showed.");
  //   getInteraction();
  // });

  return (
    <View className="bg-[#F5F5F5] h-full">
      <HomeInput></HomeInput>
      <View className="flex flex-col gap-6">
        <WordBook></WordBook>
        <InteractionEntry></InteractionEntry>
        {/* <DayTask></DayTask> */}
      </View>
    </View>
  );
}

const HomeInput = () => {
  const sysinfo = Taro.getSystemInfoSync();
  console.log(sysinfo, "sysinfo");

  return (
    <View
      className="bg-white"
      onClick={() => {
        Taro.navigateTo({
          url: "/index_subpkg/pages/search-word/index",
        });
      }}
      style={{ paddingTop: `${sysinfo.statusBarHeight}px` }}
    >
      <SearchBar placeholder="请输入单词" />
    </View>
  );
};
