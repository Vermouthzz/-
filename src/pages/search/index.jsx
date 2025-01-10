import { View } from "@tarojs/components";
import { CustomHeader } from "../../components/custom-header";
import { SearchInput } from "./widgets/search-input";

export default function SearchPage() {
  return (
    <View className="h-screen">
      <CustomHeader title={"搜索"}></CustomHeader>
      <View className="px-2">
        <SearchInput></SearchInput>
      </View>
    </View>
  );
}
