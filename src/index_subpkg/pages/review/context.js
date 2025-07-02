import { createContext } from "../../../hooks/immutable";


const initialState = {
  pageInfo: {
    page: 1,
    pageSize: 10,
  },
  setting: {
    showWord: true,
    showDesc: false,
  }
}



export const Context = createContext(initialState);