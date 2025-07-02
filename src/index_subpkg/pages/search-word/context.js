import { createContext } from "../../../hooks/immutable"

const initialState = {
  historyList: []
}

export const searchWordContext = createContext(initialState)