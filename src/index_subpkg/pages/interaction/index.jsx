import { InteractionPage } from "./switch_page/interaction-page";
import { MatchPage } from "./switch_page/match-page";
import { useLoad, useUnload } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import React, { useEffect, useRef, useState } from "react";
import { ContextProvider, Context } from "./context";

export default function Page() {
  const [allUserInfo, setAllUserInfo] = useState({
    myInfo: {
      avatar: "",
      is_winner: false,
      score: 0,
    },
    otherInfo: {
      avatar: "",
      is_winner: false,
      score: 0,
    },
  }); // 所有用户信息

  const [isMatch, setIsMatch] = useState(false); // 是否匹配成功

  const [isReady, setIsReady] = useState(false); // 对手是否准备好

  const [finishInfo, setFinishInfo] = useState({
    isFinished: false,
    resultList: [],
  }); // 对战是否结束

  const [question, setQuestion] = useState({}); // 问题
  const [time, setTime] = useState(10); // 时间
  const game_id = useRef(null); // 游戏id

  const [replyInfo, setReplyInfo] = useState({
    isCorrect: false,
    isReply: false,
  }); // 回答信息

  const [isClose, setIsClose] = useState(false); //主动断开链接

  const reSetGeme = () => {
    setFinishInfo({
      isFinished: false,
      resultList: [],
    });
    setReplyInfo({
      isCorrect: false,
      isReply: false,
    });
    setAllUserInfo((prev) => ({
      ...prev,
      otherInfo: { avatar: "", is_winner: false, score: 0 },
    }));
    setIsReady(false);
    setIsMatch(false);
    setQuestion({});
    setTime(10);
    Taro.sendSocketMessage({
      data: JSON.stringify({ type: "join" }),
    });
  };

  const sendMessage = (data) => {
    console.log("发送消息", data);
    Taro.sendSocketMessage({
      data: JSON.stringify(data),
    });
  };

  const updateUserInfo = (data) => {
    setAllUserInfo({ myInfo: data.userinfo, otherInfo: data.otherUserinfo });
  };

  useLoad(() => {
    const token = Taro.getStorageSync("token");
    Taro.connectSocket({
      url: "ws://localhost:7001/ws?token=" + token,
    });

    function sendHeartMsg() {
      setTimeout(() => {
        Taro.sendSocketMessage({
          data: JSON.stringify({ type: "heart" }),
        });
        sendHeartMsg();
      }, 10000);
    }

    Taro.onSocketOpen(() => {
      Taro.sendSocketMessage({
        data: JSON.stringify({ type: "join" }),
      });
      sendHeartMsg();
    });

    Taro.onSocketMessage((res) => {
      const data = JSON.parse(res.data);
      if (data.type === "question") {
        setQuestion(data); // 设置选项
        setReplyInfo({ isCorrect: false, isReply: false }); // 重置回答信息
        if (!isReady) {
          setTimeout(() => {
            setIsReady(true);
          }, 1500);
        }
      } else if (data.type === "end") {
        const { resultList } = data;
        setFinishInfo({
          isFinished: true,
          resultList,
        });
        updateUserInfo(data);
      } else if (data.type === "start") {
        setIsMatch(true);
        game_id.current = data.game_id;
        updateUserInfo(data);
        sendMessage({ type: "start", game_id: data.game_id });
      } else if (data.type === "time") {
        setTime(data.time);
      } else if (data.type === "result") {
        console.log(data, "结果");
        if (data.answered) {
          setReplyInfo((prev) => ({
            ...prev,
            correct_id: data.correct_id,
            isReply: true,
          }));
        }
        updateUserInfo(data);
      }
    });

    Taro.onSocketClose(() => {
      console.log("socket close");
      // if (!isClose) {
      // }
    });

    Taro.onSocketError((e) => {
      console.log("socket error", e);
    });

    Taro.enableAlertBeforeUnload({
      message: "您确定要离开当前对战吗?",
    });
  });

  useUnload(() => {
    setIsClose(true);
    Taro.closeSocket();
  });

  const reConnectSocket = () => {
    const token = Taro.getStorageSync("token");
    Taro.connectSocket({
      url: "ws://localhost:7001/ws?token=" + token,
      fail: (e) => {
        if (reConnectCount) {
          setTimeout(() => {
            reConnectSocket();
          }, 10000);
        }
      },
    });
  };

  const ContextValue = {
    replyInfo,
    setReplyInfo,
    time,
    question,
    sendMessage,
    allUserInfo,
    setAllUserInfo,
    finishInfo,
    game_id: game_id.current,
    reSetGeme,
  };

  return (
    <ContextProvider value={ContextValue}>
      {isReady ? (
        <InteractionPage></InteractionPage>
      ) : (
        <MatchPage isMatch={isMatch}></MatchPage>
      )}
    </ContextProvider>
  );
}
