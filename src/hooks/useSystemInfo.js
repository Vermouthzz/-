import { getSystemInfoSync } from "@tarojs/taro";

let systemInfo = {
  safeBtm: 0,
};

export function useSafeInfo() {
  const initInfo = () => {
    const sysInfo = getSystemInfoSync();
    const safeBtm = sysInfo.screenHeight - sysInfo.safeArea.bottom;
    systemInfo.safeBtm = safeBtm;
  };

  return {
    initInfo,
    systemInfo,
  };
}
