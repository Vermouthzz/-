import { View, Text } from "@tarojs/components";
import { Avatar } from "@nutui/nutui-react-taro";
import { MenuList } from "./widgets/menu-list";

export default function Profile() {
  return (
    <View className="bg-[#f8f8f8] h-screen">
      <ProfileTop></ProfileTop>
      <MenuList></MenuList>
    </View>
  );
}

function ProfileTop() {
  return (
    <View className="h-44 bg-slate-500 flex flex-col justify-center items-center gap-3">
      <Avatar
        size="large"
        src="https://img12.360buyimg.com/imagetools/jfs/t1/143702/31/16654/116794/5fc6f541Edebf8a57/4138097748889987.png"
      ></Avatar>
      <Text className="text-white text-base">我活在梦里</Text>
    </View>
  );
}
