import { View } from "@tarojs/components";
import clsx from "clsx";

export default function ThemePage() {
  const thmeeList = [
    {
      name: "主题1",
      className: "bg-red-500",
    },
    {
      name: "主题2",
      className: "bg-blue-500",
    },
    {
      name: "主题3",
      className: "bg-green-500",
    },
  ];
  return (
    <View className="h-screen flex flex-wrap gap-2">
      {thmeeList.map((item, index) => (
        <ThemeItem key={index} className={`${item.className} flex-1`} />
      ))}
    </View>
  );
}

function ThemeItem({ className }) {
  const switchTheme = () => {};
  return (
    <View onClick={switchTheme} className={clsx("h-40", className)}></View>
  );
}
