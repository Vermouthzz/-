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
        // Taro.uploadFile({
        //   url: "http://127.0.0.1:3000/upload/avatar", //仅为示例，并非真实的接口地址
        //   header: {
        //     token: "Bearer " + Taro.getStorageSync("token"),
        //   },
        //   filePath: tempFilePaths[0],
        //   name: "file",
        //   success: function (res) {
        //     console.log(res);
        //     const data = JSON.parse(res.data);
        //     if (res.statusCode === 200) {
        //       setUserInfo((prev) => ({ ...prev, avatar: data.filePath }));
        //       const info = Taro.getStorageSync("userInfo");
        //       info.avatar = data.filePath;
        //       Taro.setStorageSync("userInfo", info);
        //     }
        //   },
        // });
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
