import { createContext, useState } from "react";

export const UserContext = createContext({
  userOrgs: null,
  userProjects: null,
  lastOrgId: null,
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    lastOrgId: null,
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
