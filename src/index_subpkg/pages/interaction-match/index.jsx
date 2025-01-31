import { Avatar } from "@nutui/nutui-react-taro";
import { View, Image } from "@tarojs/components";
import Taro, { useLoad, useUnload } from "@tarojs/taro";
import { useContext, useEffect, useRef, useState } from "react";
import "./index.scss";
import { Context } from "../../../context";

export default function MatchPage() {
  const { socket, setConnected } = useContext(Context);
  
  useLoad(() => {
    setConnected(true);
  });

  // useEffect(() => {
  //   if (socket) {
  //     socket.onMessage((data) => {
  //       console.log("收到服务器内容：", data);
  //       const res = JSON.parse(data.data);
  //       if (res.type === "start") {
  //         setIsMatch(true);
  //         setOtherUser(res.userinfo);
  //         setTimeout(() => {
  //           Taro.redirectTo({
  //             url: `/index_subpkg/pages/interaction/index?game_id=${res.game_id}`,
  //           });
  //         }, 2000);
  //       }
  //     });
  //     socket.onOpen(() => {
  //       handleJoin();
  //     });
  //     socket.onError(() => {
  //       console.log("连接失败");
  //     });
  //     socket.onClose((e) => {
  //       console.log(e);
  //       console.log("连接关闭");
  //     });
  //   }
  // }, [socket]);

  function handleJoin() {
    const data = {
      token: 111,
      type: "join",
      // 打印发送信息
    };
    console.log("发送");
    // 发送数据

    socket.send({ data: JSON.stringify(data) });
  }
  useUnload(() => {
    // if (socket.readyState === 1 && !isMatch) {
    //   console.log("关闭socket");
    //   Taro.closeSocket();
    // }
  });
  return (
    <View className="flex h-screen relative bg-[#789765]">
      {isMatch ? <MatchResult /> : <MatchLoading />}
      <LeftUser />
      <Middle />
      <RightUser otherUser={otherUser} />
    </View>
  );
}

