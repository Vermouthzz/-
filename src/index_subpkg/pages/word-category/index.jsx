import { View, Image } from "@tarojs/components";
import { Tabs } from "@nutui/nutui-react-taro";
import { useMemo, useState } from "react";
import Taro, { useLoad } from "@tarojs/taro";
import "./index.scss";
import { getWordBook } from "../../../api/word_book";
import { useContext, useDispatch, withContext } from "../../../hooks/immutable";
import { wordCategoryContext } from "./context";

export default withContext(wordCategoryContext, WordCatePage);

function WordCatePage() {
  const dispatch = useDispatch(wordCategoryContext);
  const tabList = useMemo(() => {
    return [
      { title: "大学", id: "senior", type: "" },
      { title: "高中", id: "high", type: "" },
      { title: "初中", id: "middle", type: "" },
      { title: "小学", id: "primary", type: "" },
    ];
  }, []);
  const [tab1value, setTab1value] = useState("senior");
  const onTabChange = (value) => {
    setTab1value(value);
    getBookList(value);
  };
  const [bookList, setBookList] = useState([]);
  const getBookList = async (type) => {
    const data = { type };
    try {
      const res = await getWordBook(data);
      console.log(res);

      if (res.code === 200) {
        setBookList(res.data);
      }
    } catch (error) {}
  };
  useLoad((options) => {
    if ("type" in options) {
      dispatch((prev) => ({ ...prev, type: options.type }));
    }
    getBookList(tab1value);
  });
  return (
    <View>
      <Tabs value={tab1value} onChange={onTabChange} activeType="simple">
        {tabList.map((item) => (
          <Tabs.TabPane key={item.id} title={item.title}>
            <ListBlock list={bookList} />
          </Tabs.TabPane>
        ))}
      </Tabs>
    </View>
  );
}

function ListBlock({ list }) {
  return (
    <View className="flex flex-wrap gap-2">
      {list.length
        ? list.map((item) => {
            return <BookItem bookInfo={item} />;
          })
        : null}
    </View>
  );
}

function BookItem({ bookInfo }) {
  console.log(bookInfo, "bookInfo");
  const { type } = useContext(wordCategoryContext);
  return (
    <View
      className="h-36 rounded-sm overflow-hidden"
      style={{ width: "calc((100% - 16px) / 3)" }}
      onClick={() =>
        Taro.navigateTo({
          url:
            "/index_subpkg/pages/word-book-setting/index" +
            "?id=" +
            bookInfo.book_id +
            "&type=" +
            type,
        })
      }
    >
      <Image className="w-full h-full" src={bookInfo.img_url}></Image>
    </View>
  );
}
