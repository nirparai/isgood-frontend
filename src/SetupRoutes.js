import React from "react";
import { Switch, Route } from "react-router-dom";

import ProtectedRoute from "./auth/protected-route";
import CreateOrganisation from "./containers/initial-setup-pages/CreateOrganisation";
import CreateProject from "./containers/initial-setup-pages/CreateProject/CreateProject";
import CreateProject2 from "./containers/initial-setup-pages/CreateProject/CreateProject2";
import Personalise from "./containers/initial-setup-pages/Personalise";
import Welcome from "./containers/initial-setup-pages/Welcome";

export default function SetupRoutes() {
  return (
    <>
      <Switch>
        <Route exact path="/setup/welcome" component={Welcome} />

        <Route exact path="/setup/createorg" component={CreateOrganisation} />

        <Route exact path="/setup/createproject" component={CreateProject} />

        <Route exact path="/setup/createproject2" component={CreateProject2} />

        <Route exact path="/setup/personalise" component={Personalise} />
      </Switch>
    </>
  );
}
