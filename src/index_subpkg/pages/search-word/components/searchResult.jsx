import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useDispatch } from "../../../../hooks/immutable";
import { searchWordContext } from "../context";

export default function SearchResult({ list: resultList }) {
  return (
    <View className="bg-white w-full overflow-scroll">
      {resultList.map((item) => (
        <ResultItem key={item} info={item} />
      ))}
    </View>
  );
}

const ResultItem = ({ info }) => {
  const dispatch = useDispatch(searchWordContext);
  const toDetail = () => {
    // 跳转到详情页
    const list = Taro.getStorageSync("historyList") || [];
    const index = list.findIndex((item) => item.id === info.id);
    if (index === -1) {
      list.unshift({ word: info.word, id: info.id });
    } else {
      list.splice(index, 1);
      list.unshift({ word: info.word, id: info.id });
    }
    dispatch((prev) => ({ ...prev, historyList: list }));
    Taro.setStorageSync("historyList", list);
    Taro.navigateTo({
      url: `/index_subpkg/pages/word-detail/index?id=${info.id}`,
    });
  };
  return (
    <View
      className="bg-white w-full px-2 line-clamp-1 my-3"
      hoverClass="bg-gray-200"
      onClick={toDetail}
    >
      {info.word}
      {`(${info.mean})`}
    </View>
  );
};
