import { createContext } from "../../../hooks/immutable";

const initialState = {
  type: 'select'
}

export const wordCategoryContext = createContext(initialState);