import { View, ScrollView } from "@tarojs/components";
import { useMemo, useState, useEffect, useRef } from "react";
import { WordItem } from "../../../components/word-item";
import "./index.scss";
import {
  getStudyWord,
  getHasStudyWord,
  getNoneStudyWord,
} from "../../../api/word";
import { ScrollPaging } from "../../../components/scroll-paging";
import Taro, { useLoad, useReady } from "@tarojs/taro";

export default function WordStudyList() {
  // const paging = useRef(null);
  const voiceRef = useRef(null);
  const [tabType, setTabType] = useState("dayStudy");
  const [wordList, setWordList] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getDayTask = async (data) => {
    try {
      const res = await getStudyWord(data);
      console.log(res, "今日");
      if (res.code === 200) {
        setHasMore(false);
        setWordList(res.data);
      }
    } catch (error) {}
  };

  const getHasStudyWordList = async (data) => {
    try {
      const res = await getHasStudyWord(data);
      console.log(res, "已学");

      if (res.code === 200) {
        if (res.data.length < data.pageSize) {
          setHasMore(false);
        }
        if (data.currentPage === 1) {
          setWordList(res.data);
        } else {
          setWordList((prev) => [...prev, ...res.data]);
        }
      }
    } catch (error) {}
  };

  const getNoneStudyWordList = async (data) => {
    try {
      const res = await getNoneStudyWord(data);
      console.log(res, "未学");

      if (res.code === 200) {
        if (res.data.length < data.pageSize) {
          setHasMore(false);
        }
        if (data.currentPage === 1) {
          setWordList(res.data);
        } else {
          setWordList((prev) => [...prev, ...res.data]);
        }
      }
    } catch (error) {}
  };

  const getList = (data, type) => {
    setHasMore(true);
    if (type === "dayStudy") {
      getDayTask(data);
    } else if (type === "hasStudy") {
      getHasStudyWordList(data);
    } else if (type === "noneStudy") {
      getNoneStudyWordList(data);
    }
  };

  useEffect(() => {
    voiceRef.current = Taro.createInnerAudioContext();
  }, []);

  useLoad((options) => {
    if ("type" in options) {
      setTabType(options.type);
      getList({ pageSize: 10, currentPage: 1 }, options.type);
    }
  });

  const uploadMore = (currentPage, pageSize) => {
    getList(
      {
        currentPage,
        pageSize,
      },
      tabType
    );
  };

  const tabChange = (value) => {
    setTabType(value);
    getList(
      {
        currentPage: 1,
        pageSize: 10,
      },
      value
    );
  };

  const handleVoice = (url) => {
    voiceRef.current.src = url;
    voiceRef.current.play();
  };

  return (
    <View className="h-full">
      <WordTabs callback={tabChange} />
      <View style={{ height: "calc(100vh - 80rpx)" }}>
        <ScrollPaging
          list={wordList}
          load={false}
          className={"h-full"}
          hasMore={hasMore}
          uploadMore={uploadMore}
        >
          <View className="px-3">
            {wordList.length
              ? wordList.map((item, index) => (
                  <WordItem
                    item={item}
                    key={item.word_id}
                    index={index}
                    handleVoice={handleVoice}
                  ></WordItem>
                ))
              : null}
          </View>
        </ScrollPaging>
      </View>
    </View>
  );
}

function WordTabs({ callback }) {
  const tabList = useMemo(() => {
    return [
      {
        id: "dayStudy",
        title: "今日任务",
      },
      {
        id: "hasStudy",
        title: "已学单词",
      },
      {
        id: "noneStudy",
        title: "未学单词",
      },
    ];
  }, []);
  const [activeTab, setActiveTab] = useState("dayStudy");
  const switchTab = (id) => {
    setActiveTab(id);
    callback(id);
  };
  return (
    <View className="flex h-[80rpx] bg-white">
      {tabList.map((item) => (
        <View
          className="flex-1 leading-[80rpx] text-center relative"
          key={item.id}
          onClick={() => switchTab(item.id)}
        >
          {item.title}
          {activeTab === item.id && (
            <View className="h-1.5 rounded-full z-10 bg-green-400 w-1/3 absolute -bottom-[4rpx] left-1/2 -translate-x-1/2"></View>
          )}
        </View>
      ))}
    </View>
  );
}
