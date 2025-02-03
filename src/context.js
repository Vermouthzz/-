import { createContext, useEffect, useState } from "react";



export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  const [settingVal, setSettingVal] = useState({

  })

  const ContextValue = {
    settingVal,
    setSettingVal
  }
  return (
    <Context.Provider value={ContextValue}>
      {children}
    </Context.Provider>
  );
}
