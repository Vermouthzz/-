import { View, Text } from "@tarojs/components";
import { CustomHeader } from "../../../components/custom-header";
import Taro, { useLoad } from "@tarojs/taro";
import {
  getWordDetail,
  collectWordAPI,
  recordRawWordAPI,
  getFooterInfoAPI,
} from "../../../api/word";
import { useEffect, useRef, useState } from "react";
import { VolumeMax } from "@nutui/icons-react-taro";
import { Button } from "@nutui/nutui-react-taro";
import { useContext, useDispatch, withContext } from "../../../hooks/immutable";
import { Context } from "./context";
import { judgeIsLogin } from "../../../utils";

export default withContext(Context, WordDetail);
function WordDetail() {
  const [footerShow, setFooterShow] = useState(false);

  const { wordDetail } = useContext(Context);
  const dispatch = useDispatch(Context);

  const getFooterInfo = async (id) => {
    try {
      const res = await getFooterInfoAPI({ word_id: id });
      console.log(res, "footer");

      if (res.code == 200) {
        dispatch((prev) => {
          return {
            ...prev,
            footerInfo: {
              isCollect: res.data.is_collect,
              isRaw: res.data.is_raw,
            },
          };
        });
      }
    } catch (error) {}
  };

  const getWordDetailInfo = async (id) => {
    try {
      const data = { word_id: id };
      const res = await getWordDetail(data);
      console.log(res, "word详情");
      if (res.code === 200) {
        dispatch((state) => ({
          ...state,
          wordDetail: res.data,
        }));
      }
    } catch (error) {}
  };
  useLoad((options) => {
    if ("id" in options) {
      getWordDetailInfo(options.id);
      const token = Taro.getStorageSync("token");
      console.log(token);

      if (token) {
        getFooterInfo(options.id);
      }
    }
    if ("show" in options) {
      setFooterShow(true);
    }
  });
  return (
    <View
      className=" h-screen"
      style={{ background: "linear-gradient(135deg, #a8c6b9, #e5e0d2)" }}
    >
      <CustomHeader title={"单词详情"}></CustomHeader>
      <View className="flex flex-col px-2">
        <WordInfo info={wordDetail}></WordInfo>
        <WordInfination info={wordDetail}></WordInfination>
      </View>
      {footerShow ? <Next></Next> : null}
      <Footer></Footer>
    </View>
  );
}

function WordInfo({ info }) {
  const voiceRef = useRef(null);
  useEffect(() => {
    console.log(info);
    if (info) {
      voiceRef.current = Taro.createInnerAudioContext();
      voiceRef.current.src = info.voice;
    }
  }, [info]);

  const playVoice = () => {
    voiceRef.current.play();
  };
  return (
    <View className="flex justify-between items-center px-3 py-3 border-b border-[#eee]">
      <View className="flex flex-col gap-1">
        <Text className="text-[50rpx]">{info.word || ""}</Text>
        <Text className="text-[#eee]">{info.symbols || ""}</Text>
      </View>
      <View>
        <VolumeMax color="#559B83" onClick={playVoice}></VolumeMax>
      </View>
    </View>
  );
}

function WordInfination({ info }) {
  return (
    <View className="px-3">
      <View className="py-3">
        <Text>{info.part || ""}</Text>
        <Text className="ml-1">{info.mean || ""}</Text>
      </View>
      <View className="flex flex-col gap-2 pt-3 border-t border-[#eee]">
        <Text className="text-[24rpx] text-[#eee]">例句</Text>
        <View className="">{info.ex || ""}</View>
        <View className="">{info.tran || ""}</View>
      </View>
    </View>
  );
}

function Next() {
  return (
    <View
      className="bg-[#559B83] text-white text-center py-2 w-2/3 fixed left-1/2 bottom-32 -translate-x-1/2 rounded-full"
      onClick={() => Taro.navigateBack()}
    >
      下一个
    </View>
  );
}

function Footer() {
  // console.log(isCollect, isRaw, "footer");
  const {
    footerInfo: { isCollect, isRaw },
    wordDetail,
  } = useContext(Context);
  const dispatch = useDispatch(Context);
  console.log(isCollect, isRaw, "footer");

  const handelRaw = judgeIsLogin(async () => {
    let data = {
      word_id: wordDetail.id,
    };
    console.log(data);

    try {
      const res = await recordRawWordAPI(data);
      if (res.code === 200) {
        Taro.showToast({
          title: isRaw ? "取消成功" : "添加成功",
          icon: "success",
        });
        dispatch((prev) => ({
          ...prev,
          footerInfo: {
            ...prev.footerInfo,
            isRaw: res.data.is_raw,
          },
        }));
      }
    } catch (error) {}
  });

  const handelCollect = judgeIsLogin(async () => {
    let data = {
      word_id: wordDetail.id,
    };
    console.log(data);

    try {
      const res = await collectWordAPI(data);
      console.log(res);
      if (res.code === 200) {
        Taro.showToast({
          title: isCollect ? "取消成功" : "收藏成功",
          icon: "success",
        });
        dispatch((prev) => ({
          ...prev,
          footerInfo: {
            ...prev.footerInfo,
            isCollect: res.data.is_collect,
          },
        }));
      }
    } catch (error) {}
  });

  return (
    <View
      style={{ paddingBottom: `${44}px` }}
      className="flex items-center pt-3 justify-between px-3 gap-3 bg-white fixed bottom-0 left-0 w-full"
    >
      <Button onClick={handelCollect} className="flex-1">
        {isCollect ? "取消收藏" : "收藏"}
      </Button>
      <Button onClick={handelRaw} className="flex-1">
        {isRaw ? "取消生词" : "加入生词"}
      </Button>
    </View>
  );
}
