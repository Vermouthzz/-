import { View } from "@tarojs/components";
import { SwitchDay } from "./widgets/switch-day";
import { WordReviewList } from "./widgets/word-review-list";
import { Anchor } from "./components/anchor";
import { ArrowExchange } from "@nutui/icons-react-taro";
import Taro, { useLoad } from "@tarojs/taro";
import { useState, useMemo, useEffect } from "react";
import { getReviewWordAPI } from "../../../api/word";
import { useContext, useDispatch, withContext } from "../../../hooks/immutable";
import { Context } from "./context";
import { useSafeInfo } from "../../../hooks/useSystemInfo";
import "./index.scss";

export default withContext(Context, ReviewPage);
function ReviewPage() {
  const { pageInfo } = useContext(Context);
  const { systemInfo } = useSafeInfo();

  const [reviewList, setReviewList] = useState([]);
  // 获取复习单词列表
  const getReviewWordList = async () => {
    const data = {
      ...pageInfo,
      book_id: 1,
    };
    try {
      const res = await getReviewWordAPI(data);
      console.log(res);
      if (res.code === 200) {
        setReviewList(res.data.words);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getReviewWordList();
  }, [pageInfo]);
  return (
    <View
      className="flex flex-col h-full"
      style={{ paddingBottom: `${systemInfo.safeBtm}px` }}
    >
      <SwitchDay></SwitchDay>
      <WordReviewList className={"flex-1"} list={reviewList}></WordReviewList>
      <View className="pt-2">
        <Footer list={reviewList} setReviewList={setReviewList}></Footer>
      </View>
    </View>
  );
}

function Footer({ setReviewList, list }) {
  const { setting } = useContext(Context);
  const dispatch = useDispatch(Context);
  const [showOptions, setShowOptions] = useState(false);
  const footerList = [
    { text: "乱序", icon: <ArrowExchange />, type: "random" },
    { text: "听写", icon: <ArrowExchange />, type: "listen" },
    { text: "拼写", icon: <ArrowExchange />, type: "spell" },
    { text: "设置", icon: <ArrowExchange />, type: "setting" },
  ];
  function randomList() {
    function fisher(arr) {
      const newArr = [...arr];
      for (let i = newArr.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[randomIndex]] = [newArr[randomIndex], newArr[i]];
      }
      return newArr;
    }
    setReviewList((list) => fisher(list));
  }
  const goToPage = (type) => {
    if (type === "random") {
      randomList();
    } else if (type === "setting") {
      setShowOptions(!showOptions);
    } else {
      const args = encodeURIComponent(
        JSON.stringify({
          list,
          type,
        })
      );
      Taro.navigateTo({
        url: `/index_subpkg/pages/word-listen-write/index?args=${args}`,
      });
    }
  };

  const optionsList = useMemo(
    () => [
      {
        key: "showWord",
        name: `${setting.showWord ? "隐藏" : "显示"}单词`,
      },
      {
        key: "showDesc",
        name: `${setting.showDesc ? "隐藏" : "显示"}释义`,
      },
      {
        key: "showAll",
        name: `${setting.showDesc && setting.showWord ? "隐藏" : "显示"}显示`,
      },
    ],
    [setting]
  );

  const switchOption = (key) => {
    if (key === "showAll") {
      dispatch((prev) => ({
        ...prev,
        setting: { showWord: true, showDesc: true },
      }));
    } else if (key === "showDesc") {
      dispatch((prev) => ({
        ...prev,
        setting: { showDesc: !prev.setting.showDesc, showWord: prev.showWord },
      }));
    } else if (key === "showWord") {
      dispatch((prev) => ({
        ...prev,
        setting: {
          showWord: !prev.setting.showWord,
          showDesc: prev.setting.showDesc,
        },
      }));
    }
    setShowOptions(false);
  };

  return (
    <View className="rounded-full w-4/5 py-2 flex items-center very-shadow mx-auto relative">
      {showOptions ? (
        <View
          className="flex flex-col absolute right-1  bg-white rounded-s-sm"
          style={{ top: "-180%" }}
        >
          {optionsList.map((item) => (
            <View
              key={item.key}
              className="text-center py-2 px-4"
              onClick={() => switchOption(item.key)}
            >
              {item.name}
            </View>
          ))}
        </View>
      ) : null}

      {footerList.map((item) => (
        <Anchor
          className={"flex-1"}
          key={item.type}
          item={item}
          cliclCallback={goToPage}
        ></Anchor>
      ))}
    </View>
  );
}
