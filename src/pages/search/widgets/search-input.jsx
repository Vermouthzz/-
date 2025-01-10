import { SearchBar } from "@nutui/nutui-react-taro";
import { View } from "@tarojs/components";
import { SearchResult } from "./search-result";

export function SearchInput() {
  const onSearchResult = () => {};
  return (
    <View className="flex relative">
      <SearchBar shape="round" onSearch={onSearchResult} />
      <SearchResult></SearchResult>
    </View>
  );
}
