import React from "react";
import { Switch, Route } from "react-router-dom";

import CreateOrganisation from "./containers/initial-setup-pages/CreateOrganisation";
import CreateProject from "./containers/initial-setup-pages/CreateProject/CreateProject";
import CreateProject2 from "./containers/initial-setup-pages/CreateProject/CreateProject2";
import Personalise from "./containers/initial-setup-pages/Personalise";
import Welcome from "./containers/initial-setup-pages/Welcome";
// All these route components need to be changed as there is lots of code that can be removed from them and added to this component as it is shared across all
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
