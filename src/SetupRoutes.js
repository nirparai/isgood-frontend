import React from "react";
import { Switch, Route } from "react-router-dom";

import Personalise from "containers/initial-setup-pages/Personalise";
import Welcome from "containers/initial-setup-pages/Welcome";
import NotFound from "containers/NotFound";
import SetupCreateOrg from "containers/initial-setup-pages/SetupCreateOrg";
import SetupCreateProject from "containers/initial-setup-pages/SetupCreateProject";

export default function SetupRoutes() {
  return (
    <>
      <Switch>
        <Route exact path="/setup/welcome" component={Welcome} />

        <Route exact path="/setup/personalise" component={Personalise} />

        <Route exact path="/setup/createorg" component={SetupCreateOrg} />

        <Route
          exact
          path="/setup/createproject"
          component={SetupCreateProject}
        />

        <Route component={NotFound} />
      </Switch>
    </>
  );
}
