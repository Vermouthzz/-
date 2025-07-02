import { Text, View } from "@tarojs/components";
import { CustomHeader } from "../../../components/custom-header";
import { Answer } from "./widgets/answer";
import { useSafeInfo } from "../../../hooks/useSystemInfo";
import { WordVerify } from "./widgets/word-verify";
import Taro, { useDidShow, useLoad } from "@tarojs/taro";
import {
  collectWordAPI,
  getSingleWordAPI,
  recordRawWordAPI,
} from "../../../api/word";
import { useContext, useDispatch, withContext } from "../../../hooks/immutable";
import { WordContext } from "./context";
import { useRef } from "react";

export default withContext(WordContext, WordPage);
function WordPage() {
  const { currentIndex } = useContext(WordContext);
  const dispatch = useDispatch(WordContext);
  const audio = useRef(null);
  const setting = Taro.getStorageSync("setting");

  const getSingleWord = async () => {
    const book_id = 1;
    try {
      const res = await getSingleWordAPI({ book_id });
      console.log(res);
      dispatch((state) => ({
        ...state,
        wordInfo: res.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useDidShow(() => {
    // TODO: 获取单词
    getSingleWord();
  });
  return (
    <View
      className="h-screen flex flex-col"
      style={{ background: "linear-gradient(135deg, #a8c6b9, #e5e0d2)" }}
    >
      <CustomHeader
        title={"单词学习"}
        center={true}
        arrowColor="#fff"
      ></CustomHeader>
      <View className="flex-1 flex flex-col items-center justify-around">
        <Text className="text-white">{currentIndex}/10</Text>
        <WordVerify></WordVerify>
        <Answer className=""></Answer>
      </View>
      {/* <Footer
        style={{ height: `${safeBtm + 100}px`, paddingBottom: `${safeBtm}px` }}
      ></Footer> */}
    </View>
  );
}
