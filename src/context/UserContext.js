import { createContext, useState, useReducer, useEffect } from "react";
import OrgService from "services/orgService";
import ProjectService from "services/projectService";
import userService from "services/userService";
import { useAuth0 } from "@auth0/auth0-react";

import { Loading } from "components/Loading";

export const UserContext = createContext({
  userOrgs: [],
  userProjects: [],
  currentOrgId: null,
<<<<<<< HEAD
  currentProject: null,
  userData: null,
=======
  currentProject: {},
  userData: {},
>>>>>>> cb5a2c57d99cdcff4f6070f9efe696af0f096de4
});

const reducer = (state, action) => {
  switch (action.type) {
    case "":
      return state;

    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userOrgs: [],
    userProjects: [],
    currentOrgId: null,
    currentProject: {},
    userData: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setIsLoading(true);
        const token = await getAccessTokenSilently();
        const [projects, orgs, userData] = await Promise.allSettled([
          ProjectService.getProjectByUser(token),
          OrgService.getOrgByUser(token),
          userService.getUserData(token),
        ]);

        // const projects = await ProjectService.getProjectByUser(token);
        // const orgs = await OrgService.getOrgByUser(token);
        // const userData = await userService.getUserData(token);
        setUser((prev) => ({
          ...prev,
          userProjects: projects.value.data,
          userOrgs: orgs.value.data,
          userData: userData.value.data,
        }));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, []);

  const [store, dispatch] = useReducer(reducer, {
    currentOrgId: null,
    userOrgs: null,
    userProjects: null,
    currentProject: null,
    userData: null,
<<<<<<< HEAD
  });
  const [isLoading, setIsLoading] = useState(true);

  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setIsLoading(true);
        const token = await getAccessTokenSilently();
        const [projects, orgs, userData] = await Promise.allSettled([
          ProjectService.getProjectByUser(token),
          OrgService.getOrgByUser(token),
          userService.getUserData(token),
        ]);

        // const projects = await ProjectService.getProjectByUser(token);
        // const orgs = await OrgService.getOrgByUser(token);
        // const userData = await userService.getUserData(token);
        setUser((prev) => ({
          ...prev,
          userProjects: projects.value.data,
          userOrgs: orgs.value.data,
          userData: userData.value.data,
        }));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, []);

  const [store, dispatch] = useReducer(reducer, {
    currentOrgId: null,
    userOrgs: null,
    userProjects: null,
    currentProject: null,
    userData: null,
=======
>>>>>>> cb5a2c57d99cdcff4f6070f9efe696af0f096de4
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {isLoading ? <Loading /> : children}
    </UserContext.Provider>
  );
};

export default UserContext;
