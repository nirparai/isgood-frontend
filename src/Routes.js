import React from "react";
import { Route, Switch } from "react-router-dom";
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

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/projectprofilescreen">
        <MyProjects />
      </Route>
      <Route exact path="/projectform">
        <ProjectForm />
      </Route>
      <Route exact path="/welcome">
        <Welcome />
      </Route>
      <Route exact path="/createorg">
        <CreateOrganisation />
      </Route>
      <Route exact path="/createproject">
        <CreateProject />
      </Route>
      <Route exact path="/createproject2">
        <CreateProject2 />
      </Route>
      <Route exact path="/personalise">
        <Personalise />
      </Route>

      {/* The NotFound Route needs to stay in the bottom to work for 404 errors*/}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
