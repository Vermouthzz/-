import { createContext, useEffect, useState } from "react";



export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
  

  return (
    <Context.Provider value={ContextValue}>
      {children}
    </Context.Provider>
  );
}
