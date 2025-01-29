import { useLaunch } from "@tarojs/taro";
import "@nutui/nutui-react-taro/dist/style.css";
import "./app.scss";
import "./public/font/iconfont.css";
import { useNavigation } from "./hooks/useNavigation";
import { useSafeInfo } from "./hooks/useSystemInfo";
import { Context, ContextValue } from "./context";
import Taro from "@tarojs/taro";
import { useState } from "react";

function App({ children }) {
  useLaunch(() => {
    useSafeInfo().initInfo();
    useNavigation().initNavigationInfo();
    Taro.token = Taro.getStorageSync("token");
  });

  const [socket, setSocket] = useState(null);
  // const [userInfo, setUserInfo] = useState(null);

  // children 是将要会渲染的页面
  return <Context.Provider value={{ socket, setSocket }}>{children}</Context.Provider>;
}

export default App;
