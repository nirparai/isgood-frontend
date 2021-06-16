import React, { useContext } from "react";

import UserContext from "./context/UserContext";
import { Col, Container, Row } from "react-bootstrap";
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
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <TopNav user={user} />
<<<<<<< HEAD
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
              <Route
                exact
                path={`/home/myorganisations/edit/:orgId`}
                component={EditOrganisationPage}
              />

              <Route exact path="/home/myprojects" component={ProjectsLayout} />
              <Route
                exact
                path="/home/myprojects/:projectId"
                component={ProjectPage}
              />
              <Route
                exact
                path={`/home/myprojects/edit/:projectId`}
                component={EditProjectPage}
              />
              <Route component={NotFound} />
            </Switch>
          </Col>
        </Row>
      </Container>
=======

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
            <Route
              exact
              path={`/home/myorganisations/edit/:orgId`}
              component={EditOrganisationPage}
            />

            <Route exact path="/home/myprojects" component={ProjectsLayout} />
            <Route
              exact
              path="/home/myprojects/:projectId"
              component={ProjectPage}
            />
            <Route
              exact
              path={`/home/myprojects/edit/:projectId`}
              component={EditProjectPage}
            />
            <Route component={NotFound} />
          </Switch>
        </Col>
      </Row>
>>>>>>> cb5a2c57d99cdcff4f6070f9efe696af0f096de4
    </>
  );
}
