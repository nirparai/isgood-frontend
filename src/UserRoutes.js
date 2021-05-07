import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Switch, Route } from "react-router";

import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import OrganisationPage from "./containers/my-organisation/OrganisationPage";
import OrganisationsLayout from "./containers/my-organisation/OrganisationsLayout";
import ProjectPage from "./containers/my-projects/ProjectPage";
import ProjectsLayout from "./containers/my-projects/ProjectsLayout";

export default function UserRoutes() {
  return (
    <>
      <TopNav />
      <Container>
        <Row>
          <Col className="col-3">
            <SideNav />
          </Col>
          <Col className="col-9">
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
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
}
