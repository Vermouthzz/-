import { View } from "@tarojs/components";
import { SwitchDay } from "./widgets/switch-day";
import { WordReviewList } from "./widgets/word-review-list";
import { Anchor } from "./components/anchor";
import { ArrowExchange } from "@nutui/icons-react-taro";

export default function ReviewPage() {
  return (
    <View className="">
      <SwitchDay></SwitchDay>
      <WordReviewList></WordReviewList>
      <Footer></Footer>
    </View>
  );
}

function Footer() {
  const footerList = [
    { text: "乱序", icon: <ArrowExchange /> },
    { text: "听写", icon: <ArrowExchange /> },
    { text: "拼写", icon: <ArrowExchange /> },
  ];
  return (
    <View className="rounded-full w-2/3 py-2 flex items-center very-shadow fixed bottom-20 left-1/2 -translate-x-1/2">
      {footerList.map((item) => (
        <Anchor className={"flex-1"} text={item.text} icon={item.icon}></Anchor>
      ))}
    </View>
  );
}
