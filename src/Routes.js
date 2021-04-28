import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./auth/protected-route";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import MyProjects from "./containers/my-projects/MyProjects";
import ProjectForm from "./containers/ProjectForm";
import NotFound from "./containers/NotFound";
import Welcome from "./containers/initial-setup-pages/Welcome";
import CreateOrganisation from "./containers/initial-setup-pages/CreateOrganisation";
import CreateProject from "./containers/initial-setup-pages/CreateProject/CreateProject";
import CreateProject2 from "./containers/initial-setup-pages/CreateProject/CreateProject2";
import Personalise from "./containers/initial-setup-pages/Personalise";
import { UserContext, UserProvider } from "./context/UserContext";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/login" component={Login} />

      <Route exact path="/signup" component={Signup} />

      <Route exact path="/projectform" component={ProjectForm} />
      <UserProvider>
        <ProtectedRoute exact path="/myprojects" component={MyProjects} />

        <ProtectedRoute exact path="/welcome" component={Welcome} />

        <ProtectedRoute
          exact
          path="/createorg"
          component={CreateOrganisation}
        />

        <ProtectedRoute exact path="/createproject" component={CreateProject} />

        <ProtectedRoute
          exact
          path="/createproject2"
          component={CreateProject2}
        />

        <ProtectedRoute exact path="/personalise" component={Personalise} />
      </UserProvider>

      {/* The NotFound Route needs to stay in the bottom to work for 404 errors*/}
      <Route component={NotFound} />
    </Switch>
  );
}
