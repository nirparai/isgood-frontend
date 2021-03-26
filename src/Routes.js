import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login"
import Signup from "./containers/Signup";
import Dashboard from "./containers/Dashboard";
import NotFound from "./containers/NotFound";

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
      <Route exact path="/dashboard">
        <Dashboard />
      </Route>

      {/* The NotFound Route needs to stay in the bottom to work for 404 errors*/}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}