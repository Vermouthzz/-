import { Text, View, Image } from "@tarojs/components";
// import { Icon } from "@nutui/icons-react-taro";
import { CurrentBook } from "./widgets/current-book";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";
import {
  getUserBookAPI,
  switchCurrentBookAPI,
  delUserBookAPi,
} from "../../../api/word_book";
import { useState } from "react";
export default function WordBookSwitch() {
  const [bookInfo, setBookInfo] = useState({
    currentBookInfo: {},
    bookList: [],
  });
  const getUserBookInfo = async () => {
    try {
      const res = await getUserBookAPI();
      console.log(res);
      if (res.code === 200) {
        setBookInfo((prev) => ({
          ...prev,
          currentBookInfo: res.data.currentBookInfo,
          bookList: res.data.bookList,
        }));
      }
    } catch (error) {}
  };
  useDidShow(() => {
    getUserBookInfo();
  });
  return (
    <View className="h-screen bg-[#f5f5f5]">
      <CurrentBook currentBook={bookInfo.currentBookInfo}></CurrentBook>
      {/*  */}
      <View className="px-2">
        <View className="flex justify-between items-center px-2 py-3">
          <Text>我的书桌</Text>
          <Text
            className="text-green-500 rounded-full border border-green-500 px-3 py-[4rpx]"
            onClick={() =>
              Taro.navigateTo({
                url: "/index_subpkg/pages/word-category/index?type=add",
              })
            }
          >
            添加新书
          </Text>
        </View>
        <View className="">
          {bookInfo.bookList.map((item) => (
            <BookNo
              callback={getUserBookInfo}
              book={item}
              key={item.book_id}
            ></BookNo>
          ))}
        </View>
      </View>
    </View>
  );
}

function BookNo({ book, callback }) {
  const switchCurrentBook = async () => {
    const data = {
      book_id: book.book_id,
    };
    try {
      const res = await switchCurrentBookAPI(data);
      // if(res)
      if (res.code === 200) {
        callback();
      }
    } catch (error) {}
  };

  const confirmDel = () => {
    Taro.showModal({
      title: "提示",
      content: "确定要删除吗？",
      success: (res) => {
        if (res.confirm) {
          delUserBook();
        }
      },
    });
  };

  const delUserBook = async () => {
    try {
      const data = {
        book_id: book.book_id,
      };
      const res = await delUserBookAPi(data);
      if (res.code == 200) {
        Taro.showToast({
          title: "删除成功",
          icon: "success",
        });
        callback();
      }
    } catch (error) {}
  };
  return (
    <View className="rounded-md flex gap-2 bg-white p-3">
      <View className="w-16 h-24 bg-slate-600 rounded-md text-white font-semibold">
        <Image className="w-full h-full" src={book.img_url}></Image>
      </View>
      <View className="flex flex-col justify-between flex-1">
        <View className="flex flex-col gap-1">
          <Text className="text-[34rpx] font-medium">{book.book_name}</Text>
          <View className="flex gap-2 items-center text-[26rpx] text-gray-400">
            <Text>已完成:</Text>
            <Text>
              {book.learned_count || 0}/{book.total_count || 0}词
            </Text>
          </View>
        </View>
        <View className="flex justify-between items-center">
          <View
            className="rounded-full px-2 py-1 bg-blue-700 text-white text-sm"
            onClick={switchCurrentBook}
          >
            学习此书
          </View>
          <View
            className="rounded-full px-2 py-1 bg-red-500 text-white text-sm"
            onClick={confirmDel}
          >
            删除此书
          </View>
        </View>
      </View>
    </View>
  );
}
