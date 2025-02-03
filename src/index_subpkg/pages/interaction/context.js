import { createContext, useState } from "react";



export const Context = createContext(null);

export const ContextProvider = ({ children, value }) => {

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}
