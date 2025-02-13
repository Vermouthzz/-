import { createContext, useEffect, useReducer, useState } from "react";
import { settingReducer, initialState } from './hooks/settingReducer'


export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [settingState, setSettingState] = useReducer(settingReducer, initialState)

  const ContextValue = {
    settingState,
    setSettingState
  }
  return (
    <Context.Provider value={ContextValue}>
      {children}
    </Context.Provider>
  );
}
