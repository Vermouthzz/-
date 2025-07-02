import { Text, View, Image } from "@tarojs/components";
import { Card } from "../components/card";
import { Button, Progress } from "@nutui/nutui-react-taro";
import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../../../context";
import { IndexContext } from "../context";
import { judgeIsLogin } from "../../../utils/index";

export function WordBook() {
  const [studyInfo, setStudyInfo] = useState([
    {
      name: "已学",
      value: 0,
      type: "",
    },
    {
      name: "未学",
      value: 0,
      type: "",
    },
    {
      name: "复习",
      value: 0,
      type: "review",
    },
  ]);
  const { settingState } = useContext(Context);
  const { bookInfo } = useContext(IndexContext);
  console.log("bookInfo", bookInfo);

  useEffect(() => {
    const { today_count, review_count } = bookInfo;
    if (settingState) {
      const { value } = settingState["wordSetting"][0];
      const no_count = value - today_count;
      setStudyInfo((prev) => [
        { ...prev[0], value: today_count },
        { ...prev[1], value: no_count },
        { ...prev[2], value: review_count },
      ]);
    }
  }, [bookInfo, settingState]);

  const goToPage = judgeIsLogin((type) => {
    let url = "";
    if (type === "review") {
      url = "/index_subpkg/pages/review/index";
    } else {
      url = `/index_subpkg/pages/word-study-list/index?type=${type}`;
    }
    Taro.navigateTo({ url });
  });
  const goWordList = (e) => {
    e.stopPropagation();
    const fn = judgeIsLogin(() => {
      //阻止冒泡
      Taro.navigateTo({
        url: "/index_subpkg/pages/word-study-list/index?type=dayStudy",
      });
    });
    fn();
  };

  const startStudy = judgeIsLogin(() => {
    if (bookInfo.ishave) {
      Taro.navigateTo({
        url: "/index_subpkg/pages/word/index",
      });
    } else {
      Taro.showToast({
        title: "请先选择书籍学习",
        icon: "none",
      });
      setTimeout(() => {
        Taro.navigateTo({
          url: "/index_subpkg/pages/word-category/index",
        });
      }, 500);
    }
  });

  useEffect(() => {}, []);
  return (
    <Card title={"每日任务"}>
      <View
        onClick={(e) => {
          e.stopPropagation();
          Taro.navigateTo({ url: "/index_subpkg/pages/word-category/index" });
        }}
        className="rounded-lg h-[250rpx] bg-green-400 mt-2 mb-4 relative overflow-hidden"
      >
        <Image
          className="w-full h-full absolute left-0 right-0"
          src="http://127.0.0.1:7001/app/public/upload/common/bg.jpg"
        ></Image>
        <View className="text-white absolute top-5 flex justify-between w-full pl-4">
          <Text className=" text-[38rpx] font-bold">{bookInfo.book_name}</Text>
          <View
            onClick={goWordList}
            className="px-3 leading-[48rpx] rounded-tl-[40rpx] rounded-bl-[40rpx] text-[26rpx] bg-green-400"
          >
            词汇表
          </View>
        </View>
        <View className="flex flex-col gap-1 px-4 absolute bottom-4 left-0 w-full">
          <View className="flex items-center justify-between text-white text-[24rpx]">
            <Text>已完成{bookInfo.progress || 0}%</Text>
            <Text className="">
              {bookInfo.learnedCount}/{bookInfo.totalCount}词
            </Text>
          </View>
          <Progress
            percent={bookInfo.progress || 0}
            className="w-full"
            strokeWidth="4"
          />
        </View>
      </View>
      <View>
        <View className="text-[23rpx] text-center text-[#eee] mb-1">
          今日学习进度
        </View>
        <View className="flex justify-between px-5">
          {studyInfo.map((item) => (
            <View
              className="flex flex-col items-center px-2"
              hoverClass="bg-green-400"
              onClick={() => goToPage(item.type)}
            >
              <Text className="font-bold text-[40rpx]">{item.value}</Text>
              <Text className="text-[24rpx]">{item.name}</Text>
            </View>
          ))}
        </View>
      </View>
      <Button
        // type="primary"
        style={{ backgroundColor: "#8ABD5F" }}
        className="py-4 rounded-full w-40 mt-6 mb-3 text-[28rpx] mx-auto "
        block
        onClick={startStudy}
      >
        {true ? "开始学习" : "再来一组"}
      </Button>
    </Card>
  );
}
