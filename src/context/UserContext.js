import { createContext, useState } from "react";

export const UserContext = createContext({
  userOrgs: null,
  userProjects: null,
  currentOrgId: null,
  currentProject: null,
  isLoadingData: true,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    currentOrgId: null,
    userOrgs: null,
    userProjects: null,
    currentProject: null,
    isLoadingData: true,
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
