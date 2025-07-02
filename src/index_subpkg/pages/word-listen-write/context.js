import React from "react";
import { createContext } from "../../../hooks/immutable";


const initialState = {
  currentIndex: 0,
  type: 'listen'  // listen or write
}

export const Context = createContext(initialState)

