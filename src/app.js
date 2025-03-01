import { useLaunch } from "@tarojs/taro";
import "@nutui/nutui-react-taro/dist/style.css";
import "./app.scss";
import "./public/font/iconfont.css";
import { useNavigation } from "./hooks/useNavigation";
import { useSafeInfo } from "./hooks/useSystemInfo";
import { Context, ContextProvider } from "./context";
import Taro from "@tarojs/taro";
import { useState } from "react";

function App({ children }) {
  useLaunch(() => {
    useSafeInfo().initInfo();
    useNavigation().initNavigationInfo();
    Taro.token = Taro.getStorageSync("token");
  });

  // children 是将要会渲染的页面
  return <ContextProvider value={{}}>
    {children}
  </ContextProvider>

}

export default App;
