import { Text, View } from "@tarojs/components";
import { PlayDoubleBack, PlayDoubleForward } from "@nutui/icons-react-taro";
import { Popover, Checkbox } from "@nutui/nutui-react-taro";
import { useMemo, useState } from "react";
import { useContext, useDispatch } from "../../../../hooks/immutable";
import { Context } from "../context";

export function SwitchDay() {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <View className="flex items-center pt-3 px-3 justify-between relative">
      <SwitchItem></SwitchItem>
    </View>
  );
}

function SwitchItem() {
  const { pageInfo } = useContext(Context);
  const dispatch = useDispatch(Context);

  const switchPage = (type) => {
    let page = pageInfo.page;
    if (type === "prev") {
      page > 1 && (page -= 1);
    } else {
      if (page < 7) {
        page++;
      } else {
        page = 1;
      }
    }
    dispatch((state) => {
      return {
        ...state,
        pageInfo: {
          ...state.pageInfo,
          page,
        },
      };
    });
  };
  return (
    <View className="flex items-center gap-4 absolute left-1/2 -translate-x-1/2">
      <PlayDoubleBack
        onClick={() => switchPage("prev")}
        color="rgb(22, 163, 74)"
      />
      <Text className="text-green-600">Page {pageInfo.page}</Text>
      <PlayDoubleForward
        onClick={() => switchPage("next")}
        color="rgb(22, 163, 74)"
      />
    </View>
  );
}

function OptionsButton({ children, item }) {
  const dispatch = useDispatch(Context);
  const switchSetting = () => {
    if (item.key === "showAll") {
      dispatch((prev) => ({
        ...prev,
        setting: { showWord: true, showDesc: true },
      }));
    } else if (item.key === "showWord") {
      dispatch((prev) => ({
        ...prev,
        setting: { showWord: !prev.setting.showWord },
      }));
    } else if (item.key === "showDesc") {
      dispatch((prev) => ({
        ...prev,
        setting: { showDesc: !prev.setting.showDesc },
      }));
    }
  };
  return (
    <View className="text-gray-300" onClick={() => switchSetting}>
      {children}
    </View>
  );
}
