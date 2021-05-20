import React from "react";
import { Switch, Route } from "react-router-dom";

import CreateOrganisation from "containers/initial-setup-pages/CreateOrganisation";
import CreateProject from "containers/initial-setup-pages/CreateProject/CreateProject";
import Personalise from "containers/initial-setup-pages/Personalise";
import Welcome from "containers/initial-setup-pages/Welcome";
import NotFound from "containers/NotFound";
export default function SetupRoutes() {
  return (
    <>
      <Switch>
        <Route exact path="/setup/welcome" component={Welcome} />

        <Route exact path="/setup/personalise" component={Personalise} />

        <Route exact path="/setup/createorg" component={CreateOrganisation} />

        <Route exact path="/setup/createproject" component={CreateProject} />

        <Route component={NotFound} />
      </Switch>
    </>
  );
}
