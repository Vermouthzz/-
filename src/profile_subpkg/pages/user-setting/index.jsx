import { Text, View } from "@tarojs/components";
import { CommonLine } from "../../components/common-line";
import Taro from "@tarojs/taro";
import { Avatar } from "@nutui/nutui-react-taro";
import { uploadAvatar } from "../../../api/common";

export default function UserSettingPage() {
  const uploadAvatar = () => {
    Taro.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths;
      },
    });
  };
  return (
    <View>
      <CommonLine text="头像">
        <Avatar
          className=""
          size="small"
          src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
        ></Avatar>
      </CommonLine>
      <CommonLine text="昵称">
        <Text>张三</Text>
      </CommonLine>
    </View>
  );
}
