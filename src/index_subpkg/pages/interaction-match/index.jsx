import { Avatar } from "@nutui/nutui-react-taro";
import { View, Image } from "@tarojs/components";
import Taro, { useLoad, useUnload } from "@tarojs/taro";
import { useContext, useEffect, useRef, useState } from "react";
import "./index.scss";
import { Context } from "../../../context";
export default function MatchPage() {
  const { setSocket } = useContext(Context);
  const [isMatch, setIsMatch] = useState(false);
  const [otherUser, setOtherUser] = useState(null);
  const socketTask = useRef(null);
  useLoad(async () => {
    socketTask.current = await Taro.connectSocket({
      url: "ws://localhost:3000/ws?token=" + Taro.getStorageSync("token"),
    });
    if (socketTask.current) {
      setSocket(socketTask.current);
    }
  });

  useEffect(() => {
    if (socketTask.current) {
      socketTask.current.onMessage((data) => {
        console.log("收到服务器内容：", data);
        const res = JSON.parse(data.data);
        if (res.type === "start") {
          setIsMatch(true);
          // setOtherUser(res.data.userinfo);
          setTimeout(() => {
            Taro.redirectTo({
              url: "/index_subpkg/pages/interaction/index",
            });
          }, 500);
        }
      });
      socketTask.current.onOpen(() => {
        handleJoin();
      });
      socketTask.current.onError(() => {
        console.log("连接失败");
      });
      socketTask.current.onClose(() => {
        console.log("连接关闭");
      });
    }
  }, [socketTask.current]);

  function handleJoin() {
    const data = {
      token: 111,
      type: "join",
    };
    console.log("发送");

    socketTask.current.send({ data: JSON.stringify(data) });
  }
  useUnload(() => {
    if (socketTask.current.readyState === 1 && !isMatch) {
      Taro.closeSocket();
    }
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

function MatchLoading() {
  return (
    <View className="absolute top-28 w-full left-0 text-center text-white text-xl blinking">
      正在匹配对手中...
    </View>
  );
}

function MatchResult() {
  return (
    <View className="absolute top-28 w-full left-0 text-center text-white text-xl">
      匹配成功！正在进入对战
    </View>
  );
}

function Middle() {
  return (
    <View className="h-full flex flex-col justify-center items-center">
      <Image
        className="w-20 -mt-20"
        src={require("../../../public/image/common/vs.svg")}
      ></Image>
    </View>
  );
}

function LeftUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser({
      avatar:
        "https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png",
    });
  });
  return (
    <View className="h-full flex-1 flex flex-col justify-center items-center">
      <Avatar
        className="-mt-40 w-24 h-24"
        size="large"
        src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
      ></Avatar>
    </View>
  );
}

function RightUser({ otherUser }) {
  return (
    <View className="h-full flex-1 flex flex-col justify-center items-center">
      <Avatar
        className="w-24 h-24"
        src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
      ></Avatar>
    </View>
  );
}
