import React, { createContext, useEffect, useReducer, useState } from "react";
import { settingReducer, initialState } from './hooks/settingReducer'
import Taro from "@tarojs/taro";


export const Context = createContext(null);




export const ContextProvider = ({ children, value }) => {
  const state = Taro.getStorageSync('setting')
  console.log(state, 'state');

  const [settingState, setSettingState] = useReducer(settingReducer, state)

  const ContextValue = {
    ...value,
    settingState,
    setSettingState
  }
  return (
    <Context.Provider value={ContextValue}>
      {children}
    </Context.Provider>
  );
}
