import { useLaunch } from "@tarojs/taro";
import "@nutui/nutui-react-taro/dist/style.css";
import "./app.scss";
import "./public/font/iconfont.css";
import { useNavigation } from "./hooks/useNavigation";
import { useSafeInfo } from "./hooks/useSystemInfo";
import { Context, ContextValue } from "./context";
import Taro from "@tarojs/taro";

function App({ children }) {
  useLaunch(() => {
    useSafeInfo().initInfo();
    useNavigation().initNavigationInfo();
    Taro.token = Taro.getStorageSync("token");
  });

  // const [userInfo, setUserInfo] = useState(null);

  // children 是将要会渲染的页面
  return <Context.Provider value={ContextValue}>{children}</Context.Provider>;
}

export default App;
