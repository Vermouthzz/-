import { Button, InputNumber } from "@nutui/nutui-react-taro";
import { Text, View, Image } from "@tarojs/components";
import { Context } from "../../../context";
import { useMemo, useState, useEffect, useContext } from "react";
import {
  getBookTotalInfoAPI,
  addUserBookAPI,
  getBookHadExistAPI,
} from "../../../api/word_book";
import Taro, { useLoad } from "@tarojs/taro";
import { judgeIsLogin } from "../../../utils";

export default function WordBookSetting() {
  const [type, setType] = useState("select");
  const getBookInfo = async (data) => {
    try {
      const res = await getBookTotalInfoAPI(data);
      if (res.code == 200) {
        console.log(res.data);

        setBookInfo((prev) => ({
          ...res.data.bookInfo,
          total_words: res.data.total_words,
        }));
      }
    } catch (error) {}
  };

  const [bookInfo, setBookInfo] = useState({
    total_words: 0,
    book_name: "",
    hadAdd: false,
  });
  const { settingState } = useContext(Context);

  const finishDay = useMemo(() => {
    return Math.ceil(
      bookInfo.total_words / Number(settingState["wordSetting"][0].value)
    );
  }, [settingState["wordSetting"][0].value, bookInfo.total_words]);

  const getBookHadExist = async (data) => {
    try {
      const res = await getBookHadExistAPI(data);
      console.log(res);

      if (res.code == 200) {
        setBookInfo((prev) => ({ ...prev, hadAdd: res.data }));
      }
    } catch (error) {}
  };

  useLoad((options) => {
    if ("type" in options) {
      const { type } = options;
      setType(type);
    }
    getBookInfo({ book_id: options.id });
    getBookHadExist({ book_id: options.id });
  });
  return (
    <View className="h-screen bg-[#f5f5f5]">
      <BookBlock finishDay={finishDay} bookInfo={bookInfo} />
      <StudySetting type={type} bookInfo={bookInfo} />
    </View>
  );
}

function BookBlock({ finishDay, bookInfo }) {
  const [finishDate, setFinishDate] = useState("");

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + finishDay);
    setFinishDate(
      `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
    );
  }, [finishDay]);
  return (
    <View className="flex gap-3 p-6 bg-white">
      <View className="w-20 h-28 bg-slate-600 rounded-md text-white font-semibold">
        <Image src={bookInfo.img_url} className="w-full h-full rounded-md" />
      </View>
      <View className="flex flex-col justify-between">
        <View className="flex flex-col gap-2">
          <Text>{bookInfo.book_name}</Text>
          <View className="flex gap-1 text-sm">
            <Text className="text-white bg-orange-400 rounded-full px-1">
              真题
            </Text>
            <Text className="">{bookInfo.total_words}词</Text>
          </View>
        </View>
        <View className="flex gap-2 items-center">
          <View className="text-[24rpx] font-medium text-white bg-green-500 rounded-[4rpx] p-1">
            预计完成时间
          </View>
          <Text>{finishDate}</Text>
        </View>
      </View>
    </View>
  );
}

function StudySetting({ type, bookInfo }) {
  const addBook = judgeIsLogin(async () => {
    try {
      const data = {
        book_id: bookInfo.book_id,
        type,
      };
      const res = await addUserBookAPI(data);
      console.log(res, "----------------");
      if (res.code == 200) {
        Taro.showToast({
          title: "添加成功",
          icon: "success",
        });
        setTimeout(() => {
          Taro.navigateBack();
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  });
  return (
    // <View className="mt-">
    //   <View className="flex justify-between items-center p-3">
    //     <View className="flex flex-col gap-3">
    //       <Text>每日学习任务</Text>
    //       <InputNumber
    //         value={settingState["wordSetting"][0].value}
    //         min={1}
    //         max={100}
    //       ></InputNumber>
    //     </View>
    //     <View className="flex flex-col gap-3 items-center font-semibold text-[26rpx]">
    //       <Text>完成天数</Text>
    //       <Text>{finishDay}</Text>
    //     </View>
    //   </View>

    // </View>
    <Button
      type="primary"
      onClick={addBook}
      disabled={bookInfo.hadAdd}
      className="fixed left-1/2 -translate-x-1/2 bottom-32 w-1/3"
    >
      {type == "add" ? "确认添加" : "确认学习"}
    </Button>
  );
}
