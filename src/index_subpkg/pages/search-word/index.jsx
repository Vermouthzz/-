import { View } from "@tarojs/components";
import { SearchBar } from "@nutui/nutui-react-taro";
import { searchWordAPI } from "../../../api/word";
import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import SearchResult from "./components/searchResult";
import { useContext, useDispatch, withContext } from "../../../hooks/immutable";
import { searchWordContext } from "./context";

export default withContext(searchWordContext, SearchWord);

function SearchWord() {
  const onSearch = (value) => {
    value ? setIsSearch(true) : setIsSearch(false);
    setSearchValue(value);
    getSearchResult(value);
  };
  const [searchValue, setSearchValue] = useState("");

  const [isSearch, setIsSearch] = useState(false);

  const [searchResult, setSearchResult] = useState([]);

  const getSearchResult = async (value) => {
    // TODO: 获取搜索结果
    try {
      const data = {
        keyword: value,
      };
      const res = await searchWordAPI(data);
      if (res.code == 200) {
        setSearchResult(res.data);
      }
      console.log(res);
    } catch (error) {}
  };
  return (
    <View>
      <SearchBar
        value={searchValue}
        onChange={onSearch}
        placeholder="请输入搜索内容"
        actionText="取消"
      />
      {isSearch ? <SearchResult list={searchResult} /> : <HistoryList />}
    </View>
  );
}

const HistoryList = () => {
  const { historyList } = useContext(searchWordContext);
  const dispatch = useDispatch(searchWordContext);
  useEffect(() => {
    // TODO: 获取历史记录
    const list = Taro.getStorageSync("historyList");
    if (list) {
      dispatch((prev) => ({ ...prev, historyList: list }));
    }
  }, []);
  return (
    <View className="flex flex-wrap gap-2 mt-5 px-5">
      {historyList.map((item) => (
        <HistoryItem key={item} item={item} />
      ))}
    </View>
  );
};

const HistoryItem = ({ item }) => {
  const toDetail = () => {
    Taro.navigateTo({
      url: `/index_subpkg/pages/word-detail/index?id=${item.id}`,
    });
  };
  return (
    <View
      className="border border-gray-400 p-2 w-fit text-[26rpx]"
      onClick={toDetail}
    >
      {item.word}
    </View>
  );
};
