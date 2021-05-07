import React from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./auth/protected-route";
import { UserProvider } from "./context/UserContext";

import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import ProjectForm from "./containers/ProjectForm";
import NotFound from "./containers/NotFound";
import UserRoutes from "./UserRoutes";
import SetupRoutes from "./SetupRoutes";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/login" component={Login} />

      <Route exact path="/signup" component={Signup} />

      <Route exact path="/projectform" component={ProjectForm} />
      <UserProvider>
        <ProtectedRoute path="/home" component={UserRoutes} />
        <ProtectedRoute path="/setup" component={SetupRoutes} />
      </UserProvider>

      {/* The NotFound Route needs to stay in the bottom to work for 404 errors*/}
      <Route component={NotFound} />
    </Switch>
  );
}
