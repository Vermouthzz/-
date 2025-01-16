import { View } from "@tarojs/components";
import { InteractionUser } from "./widgets/interaction-user";
import { InteractionResult } from "./widgets/interaction-result";
import { InteractionTopic } from "./widgets/interaction-topic";

export default function InteractionPage() {
  return (
    <View className="h-screen bg-[#5977F2]">
      <InteractionUser></InteractionUser>
      <View className="px-3">
        {/* <InteractionResult></InteractionResult>
        <Footer></Footer> */}
        <InteractionTopic></InteractionTopic>
      </View>
    </View>
  );
}

function Footer() {
  return <View className=""></View>;
}
