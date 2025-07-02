import { ScrollView, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import clsx from "clsx";
import { useEffect, useState } from "react";

export function VirtualList({ children, className, style, itemHeight, list }) {
  // console.log(children());

  const [scrollTop, setScrollTop] = useState(0); // 滚动条位置
  const [containerHeight, setContainerHeight] = useState(0); // 容器高度
  const [size, setSize] = useState(0); // 列表项数量
  const [startIndex, setStartIndex] = useState(0); // 起始索引
  //const [endIndex, setEndIndex] = useState(0); // 结束索引
  const [visibleList, setVisibleList] = useState([]); // 可见列表
  console.log(visibleList);
  
  useEffect(() => {
    // console.log(containerHeight, itemHeight);
    if (containerHeight && itemHeight) {
      const size = Math.ceil(containerHeight / itemHeight);
      console.log(size, '---');
      setSize(size);
      // setEndIndex(size);
    }
  }, [containerHeight]);

  useEffect(() => {
    // console.log(startIndex, size + startIndex);
    setVisibleList(list.slice(startIndex, size + startIndex));
  }, [startIndex, size]);

  useEffect(() => {}, [scrollTop]);

  function handleScroll(e) {
    const { scrollTop, scrollHeight } = e.detail;
    setScrollTop(scrollTop);
  }

  useEffect(() => {
    const container = Taro.createSelectorQuery().select("#container");
    container
      .boundingClientRect((rect) => rect && setContainerHeight(rect.height))
      .exec();
  }, []);
  return (
    <ScrollView
      id="container"
      scrollY={true}
      style={style}
      className={clsx(className)}
      onScroll={handleScroll}
    >
      {/* 滚动容器 */}
      <View className=""></View>
      {/* 虚拟列表 */}
      <View className="">
        {visibleList.map((item) => {
          return children(item, index);
        })}
      </View>
    </ScrollView>
  );
}
