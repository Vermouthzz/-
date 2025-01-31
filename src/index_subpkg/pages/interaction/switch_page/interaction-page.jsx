import { View } from "@tarojs/components";
import { InteractionUser } from "../widgets/interaction-user";
import { InteractionResult } from "../widgets/interaction-result";
import { InteractionTopic } from "../widgets/interaction-topic";

export function InteractionPage() {
  return (
    <View className="h-screen bg-[#5977F2]">
      <InteractionUser
        userInfo={allUserInfo}
        time={question.time}
        isFinish={isFinished}
      ></InteractionUser>
      <View className="px-3">
        {isFinished ? (
          <React.Fragment>
            <InteractionResult></InteractionResult>
            <Footer></Footer>
          </React.Fragment>
        ) : (
          <InteractionTopic question={question}></InteractionTopic>
        )}
      </View>
    </View>
  );
}

function Footer() {
  return <View className=""></View>;
}
