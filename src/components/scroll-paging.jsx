import { Empty, InfiniteLoading } from "@nutui/nutui-react-taro";
import { ScrollView } from "@tarojs/components";
import clsx from "clsx";
import { useState, useEffect } from "react";

export function ScrollPaging({
  list = [],
  className,
  uploadMore,
  pageSize = 10,
  children,
  load = true,
  hasMore = true,
  style = {},
}) {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (load) {
      uploadMore(currentPage, pageSize);
      setCurrentPage(currentPage + 1);
    }
  }, [load]);
  const handleScrollToLower = () => {
    console.log(currentPage, "当前页码,触发触底加载");

    uploadMore(currentPage, pageSize);
    setCurrentPage(currentPage + 1);
  };
  return (
    <InfiniteLoading
      style={style}
      className={className}
      target="scroll"
      hasMore={hasMore}
      onLoadMore={handleScrollToLower}
      loadingText={<>加载中....</>}
      loadMoreText={<>没有更多了....</>}
    >
      {list.length ? (
        children
      ) : (
        <Empty className="h-full" description="暂无数据" />
      )}
    </InfiniteLoading>
  );
}
