import React from "react";


export const Context = React.createContext(null)



export const ContextProvider = React.createElement(Context.Provider, { value }, children)