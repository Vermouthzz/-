import { createContext } from "../../../hooks/immutable";


const initialState = {
  currentBookInfo: {},
  bookList: [],
}


export const Context = createContext(initialState)