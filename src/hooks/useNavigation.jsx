import {
  getSystemInfoSync,
  getMenuButtonBoundingClientRect,
} from "@tarojs/taro";

const navigationInfo = {
  height: 0,
  pt: 0,
};
export function useNavigation() {
  const initNavigationInfo = () => {
    const sysInfo = getSystemInfoSync();
    const { height, top } = getMenuButtonBoundingClientRect();
    const statusBarHeight = sysInfo.statusBarHeight || 44;
    const headerHeight = (top - statusBarHeight) * 2 + height;
    navigationInfo.height = headerHeight + sysInfo.safeArea.top;
    navigationInfo.pt = sysInfo.safeArea.top;
  };
  return {
    initNavigationInfo,
    navigationInfo,
  };
}
