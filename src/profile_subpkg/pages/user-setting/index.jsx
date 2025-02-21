import { Text, View } from "@tarojs/components";
import { CommonLine } from "../../components/common-line";
import Taro, { useLoad } from "@tarojs/taro";
import { Avatar } from "@nutui/nutui-react-taro";
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
        console.log(tempFilePaths);
        Taro.navigateTo({
          url: `/profile_subpkg/pages/cooper/index?path=${tempFilePaths[0]}`,
        });
      },
    });
  };

  useLoad(() => {
    const userInfo = Taro.getStorageSync("userInfo");
    setUserInfo(userInfo);
  });
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
    </View>
  );
}
