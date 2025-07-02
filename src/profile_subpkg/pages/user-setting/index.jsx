import { Text, View } from "@tarojs/components";
import { CommonLine } from "../../components/common-line";
import Taro, { useLoad } from "@tarojs/taro";
import { Avatar, Button } from "@nutui/nutui-react-taro";
import { uploadAvatar } from "../../../api/common";
import { useState } from "react";

export default function UserSettingPage() {
  const [useInfo, setUserInfo] = useState({ avatar: "", user_name: "" });
  const uploadAvatar = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album"],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
        // Taro.navigateTo({
        //   url: `/profile_subpkg/pages/cooper/index?path=${tempFilePaths[0]}`,
        // });
        Taro.navigateTo({
          url: `/profile_subpkg/pages/share-poster/index?backUrl=${tempFilePaths[0]}`,
        });
      },
    });
  };

  useLoad(() => {
    const userInfo = Taro.getStorageSync("userInfo");
    setUserInfo(userInfo);
  });

  const exit = () => {
    Taro.removeStorageSync("userInfo");
    Taro.removeStorageSync("token");
    Taro.removeStorageSync("refreshToken");
    Taro.showToast({
      title: "退出成功",
      icon: "none",
    });
    setTimeout(() => {
      Taro.switchTab({
        url: "/pages/profile/index",
      });
    }, 500);
  };
  return (
    <View>
      <CommonLine text="头像">
        <Avatar
          onClick={uploadAvatar}
          size="small"
          src={useInfo.avatar}
        ></Avatar>
      </CommonLine>
      <CommonLine text="昵称">
        <Text>{useInfo.user_name}</Text>
      </CommonLine>

      <Button
        className="fixed bottom-20 left-1/2 -translate-x-1/2"
        onClick={exit}
      >
        退出登录
      </Button>
    </View>
  );
}
