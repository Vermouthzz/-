import React, { useState } from "react";


export const Context = React.createContext(null)

export const withContext = (Render) => {

  return function WithContextComponent() {
    const [interactionInfo, setInteractionInfo] = useState({
      total_count: 0,
      win_count: 0,
      win_rate: 0,
    })

    const value = {
      interactionInfo,
      setInteractionInfo,
    }
    return (
      <Context.Provider value={value}>
        <Render />
      </Context.Provider>
    );
  };
}