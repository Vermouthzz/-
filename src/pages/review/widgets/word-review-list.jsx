import React, { useState, useEffect } from "react";
import { Cell, InfiniteLoading, Loading } from "@nutui/nutui-react-taro";
import { ReviewWordItem } from "../components/review-word-item";
import { View } from "@tarojs/components";

export function WordReviewList() {
  const [hasMore, setHasMore] = useState(true);
  const [wordList, setWordList] = useState([]);
  const loadMore = () => {};
  const getWordList = () => {
    wordList.push(...[1, 2, 3, 4, 5, 6, 7]);
    setWordList([...wordList]);
  };
  useEffect(() => {
    console.log(111);

    getWordList();
  }, []);
  return (
    <View>
      <View
        className="w-full p-0 overflow-y-auto overflow-x-hidden"
        id="scroll"
      >
        <InfiniteLoading
          target="scroll"
          hasMore={hasMore}
          onLoadMore={loadMore}
          loadingText={
            <>
              {Loading}
              加载中
            </>
          }
          loadMoreText={<>没有更多了</>}
        >
          {wordList.map((item, index) => {
            return (
              <View className="mx-3">
                <ReviewWordItem key={index}></ReviewWordItem>
              </View>
            );
          })}
        </InfiniteLoading>
      </View>
    </View>
  );
}
