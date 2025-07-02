import React, { useState } from "react";
import { Wapper } from "../../components/wapper";

export const IndexContext = React.createContext(null)
export const initialState = {
  interactionInfo: [
    { text: "累计pk数", value: 0, type: "total_count" },
    { text: "累计胜场", value: 0, type: "win_count" },
    { text: "pk胜率", value: 0, type: "win_rate", unit: "%" },
  ],
  bookInfo: {
    today_count: 0,
    review_count: 0,
    no_count: 0,
    progress: 0,
    book_name: "未选择书籍",
    totalCount: 0,
    learnedCount: 0,
    ishave: false
  }
}

export const withContext = (Render) => {

  return function WithContextComponent() {
    const [interactionInfo, setInteractionInfo] = useState([
      { text: "累计pk数", value: 0, type: "total_count" },
      { text: "累计胜场", value: 0, type: "win_count" },
      { text: "pk胜率", value: 0, type: "win_rate", unit: "%" },
    ])

    const [bookInfo, setBookInfo] = useState({
      today_count: 0,
      review_count: 0,
      no_count: 0,
      progress: 0,
      book_name: "未选择书籍",
      totalCount: 0,
      learnedCount: 0,
      ishave: false
    })

    const value = {
      interactionInfo,
      setInteractionInfo,
      bookInfo,
      setBookInfo
    }
    return (
      <IndexContext.Provider value={value}>
        <Wapper>
          <Render />
        </Wapper>
      </IndexContext.Provider>
    );
  };
}