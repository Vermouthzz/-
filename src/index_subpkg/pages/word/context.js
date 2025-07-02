import { createContext } from "../../../hooks/immutable"



const initialState = {
  currentIndex: 1,
  wordInfo: {
    word: {},
    meanList: []
  },
}

export const WordContext = createContext(initialState)