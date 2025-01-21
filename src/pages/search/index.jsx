import { View } from "@tarojs/components";
import { CustomHeader } from "../../components/custom-header";
import { SearchInput } from "./widgets/search-input";
import { SearchHistory } from "./widgets/search-history";

export default function SearchPage() {
  return (
    <View className="h-screen">
      <View className="">
        <SearchInput></SearchInput>
      </View>
      <SearchHistory></SearchHistory>
    </View>
  );
}
