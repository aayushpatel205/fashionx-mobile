import React, { useState } from "react";
import { useContext, createContext } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <AppContext.Provider
      value={{ activeTab, setActiveTab }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = () => useContext(AppContext);
