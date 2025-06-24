import React, { useState } from "react";
import { useContext, createContext } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Home");
  const [activeProduct , setActiveProduct] = useState({});
  const [activeOrder , setActiveOrder] = useState({});  
  return (
    <AppContext.Provider
      value={{ activeTab, setActiveTab , activeProduct , setActiveProduct , activeOrder , setActiveOrder}}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppData = () => useContext(AppContext);
