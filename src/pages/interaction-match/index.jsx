import { Avatar } from "@nutui/nutui-react-taro";
import { View, Image } from "@tarojs/components";

export default function MatchPage() {
  return (
    <View className="flex h-screen">
      <LeftUser />
      <Middle />
      <RightUser />
    </View>
  );
}

function Middle() {
  return (
    <View className="h-full">
      <Image src={require("../../public/image/common/vs.svg")}></Image>
    </View>
  );
}

function LeftUser() {
  return (
    <View className="h-full">
      <Avatar
        className=""
        size="large"
        src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
      ></Avatar>
    </View>
  );
}

function RightUser() {
  return (
    <View className="h-full">
      <Avatar
        className=""
        size="large"
        src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
      ></Avatar>
    </View>
  );
}
