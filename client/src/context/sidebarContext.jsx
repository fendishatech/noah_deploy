import { createContext, useState } from "react";

// CREATE CONTEXT
const SidebarContext = createContext();

// SET PROVIDER
const SidebarContextProvider = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  // provider returns
  return (
    <SidebarContext.Provider value={{ sidebarToggle, setSidebarToggle }}>
      {children}
    </SidebarContext.Provider>
  );
};

// EXPORT CONTEXT AND PROVIDER
export { SidebarContext, SidebarContextProvider };
