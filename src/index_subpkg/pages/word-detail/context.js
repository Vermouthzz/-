import { createContext } from "../../../hooks/immutable"


const initialState = {
  wordDetail: {},
  footerInfo: {
    isRaw: false,
    isCollect: false
  }
}

export const Context = createContext(initialState)