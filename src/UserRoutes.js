import React, { useContext } from "react";

import UserContext from "./context/UserContext";
import { Col, Row } from "react-bootstrap";
import { Switch, Route } from "react-router";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import OrganisationPage from "./containers/my-organisation/OrganisationPage";
import EditOrganisationPage from "./containers/my-organisation/EditOrganisationPage";
import OrganisationsLayout from "./containers/my-organisation/OrganisationsLayout";
import ProjectPage from "./containers/my-projects/ProjectPage";
import ProjectsLayout from "./containers/my-projects/ProjectsLayout";
import NotFound from "./containers/NotFound";
import EditProjectPage from "containers/my-projects/EditProjectPage";

export default function UserRoutes() {
  const { user } = useContext(UserContext);

  return (
    <>
      <TopNav user={user} />

      <Row>
        <Col className="col-md-3 p-0">
          <SideNav />
        </Col>
        <Col className="col-md-9 p-0">
          <Switch>
            <Route
              exact
              path="/home/myorganisations"
              component={OrganisationsLayout}
            />
            <Route
              exact
              path={`/home/myorganisations/:orgId`}
              component={OrganisationPage}
            />

            <Route exact path="/home/myprojects" component={ProjectsLayout} />
            <Route
              exact
              path="/home/myprojects/:projectId"
              component={ProjectPage}
            />
            <Route component={NotFound} />
          </Switch>
        </Col>
      </Row>
    </>
  );
}
