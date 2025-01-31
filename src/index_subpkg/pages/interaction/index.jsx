import { InteractionPage } from "./switch_page/interaction-page";
import { MatchPage } from "./switch_page/match-page";
import { useLoad } from "@tarojs/taro";
import Taro from "@tarojs/taro";
import React, { useContext, useEffect, useRef, useState } from "react";

export default function Page() {
  const socket = useRef(null);
  const [isMatch, setIsMatch] = useState(false); // 是否匹配成功
  const [otherUser, setOtherUser] = useState({ avatar: "" }); // 对手信息
  const [isReady, setIsReady] = useState(false); // 对手是否准备好
  useEffect(() => {
    if (socket.current) {
      socket.current.onMessage((res) => {
        const data = JSON.parse(res.data);
        if (data.type === "question") {
          setQuestion(data.data);
          setIsReady(true);
        } else if (data.type === "finish") {
          setIsFinished(true);
        } else if (data.type === "start") {
          setIsMatch(true);
          setOtherUser(data.userinfo);
          socket.current.send({
            data: JSON.stringify({
              type: "start",
            }),
          });
        }
      });
    }
  }, [socket.current]);
  useLoad(async () => {
    const token = "Bearer " + Taro.getStorageSync("token");
    const ws = await Taro.connectSocket({
      url: "ws://localhost:3000/ws?token=" + token,
      success: () => {
        socket.current = ws;
      },
    });

    Taro.enableAlertBeforeUnload({
      message: "您确定要离开当前对战吗?",
      success: function (res) {
        socket.close();
      },
    });
  });

  return (
    <>
      {isReady ? (
        <InteractionPage></InteractionPage>
      ) : (
        <MatchPage otherInfo={otherUser} isMatch={isMatch}></MatchPage>
      )}
    </>
  );
}
