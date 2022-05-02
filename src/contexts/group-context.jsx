import { createContext, useState, useEffect } from "react";

//actual value I want to access
export const GroupContext = createContext({
  currentGroups: [],
  setCurrentGroups: () => [],
});

export const GroupProvider = ({ children }) => {
  const [currentGroups, setCurrentGroups] = useState([]);
  const value = { currentGroups, setCurrentGroups };

  return (
    <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
  );
};
