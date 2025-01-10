import { View } from "@tarojs/components";
import { Avatar, Button } from "@nutui/nutui-react-taro";

export default function Profile() {
  return (
    <View className="">
      <Button type="primary">哈哈哈哈</Button>
    </View>
  );
}

function ProfileTop() {
  return (
    <View className="">
      <Avatar
        size="large"
        src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
      ></Avatar>
    </View>
  );
}
