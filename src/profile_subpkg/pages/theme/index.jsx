import { View } from "@tarojs/components";
import clsx from "clsx";
import { useContext } from "react";
import { Context } from "../../../context";

export default function ThemePage() {
  const thmeeList = [
    {
      name: "主题1",
      themeClass: "red-theme",
    },
    {
      name: "主题2",
      themeClass: "bg-blue-500",
    },
    {
      name: "主题3",
      themeClass: "bg-green-500",
    },
  ];
  return (
    <View className="h-screen flex flex-wrap gap-2">
      <View style={{ color: "var(--title-color)" }}>1111111</View>
      {thmeeList.map((item, index) => (
        <ThemeItem
          key={index}
          themeClass={item.themeClass}
          className={`${item.themeClass} flex-1`}
        />
      ))}
    </View>
  );
}

function ThemeItem({ className, themeClass }) {
  const { onChangeTheme } = useContext(Context);
  const switchTheme = () => {
    onChangeTheme(themeClass);
  };
  return (
    <View onClick={switchTheme} className={clsx("h-40", className)}></View>
  );
}
