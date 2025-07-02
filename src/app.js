import { useLaunch } from "@tarojs/taro";
import "@nutui/nutui-react-taro/dist/style.css";
import "./app.scss";
import "./public/font/iconfont.css";
import { useNavigation } from "./hooks/useNavigation";
import { useSafeInfo } from "./hooks/useSystemInfo";
import { Context, ContextProvider } from "./context";
import Taro from "@tarojs/taro";
import { getUserInfoAPI } from "./api/user";
import { useRef, useState } from "react";
import { initialState } from "./hooks/settingReducer";


function App({ children }) {
  function getDayTask() {
    const setting = Taro.getStorageSync("setting");
    if (!setting) {
      Taro.setStorageSync("setting", initialState);
    }
  }

  async function getUserInfo() {
    const token = Taro.getStorageSync("token");
    if (token) {
      const res = await getUserInfoAPI()
      console.log(res);

      if (res.code == 200) {
        Taro.setStorageSync("userInfo", res.userinfo)
      }
    }
  }

  useLaunch(() => {
    useSafeInfo().initInfo();
    getUserInfo();
    useNavigation().initNavigationInfo();
    getDayTask();
    // Taro.token = Taro.getStorageSync("token");
  });


  // children 是将要会渲染的页面
  return <ContextProvider>
    {children}
  </ContextProvider>

}

export default App;
