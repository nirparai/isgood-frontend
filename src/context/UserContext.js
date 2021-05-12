import { createContext, useState } from "react";

export const UserContext = createContext({
  userId: null,
  currentOrgId: null,
  currentProjectId: null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userId: null,
    lastOrgId: null,
    currentProjectId: null,
    currentOrgId: null,
    orgId: null,
    userOrgs: null,
    userProjects: null,
  });
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
