import React, { useEffect, useContext } from "react";
import OrgService from "./services/orgService";
import ProjectService from "./services/projectService";
import { useAuth0 } from "@auth0/auth0-react";

import UserContext from "./context/UserContext";
import { Col, Container, Row } from "react-bootstrap";
import { Switch, Route } from "react-router";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import OrganisationPage from "./containers/my-organisation/OrganisationPage";
import OrganisationsLayout from "./containers/my-organisation/OrganisationsLayout";
import ProjectPage from "./containers/my-projects/ProjectPage";
import ProjectsLayout from "./containers/my-projects/ProjectsLayout";
import NotFound from "./containers/NotFound";

export default function UserRoutes() {
  const { getAccessTokenSilently } = useAuth0();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const token = await getAccessTokenSilently();
        const projects = await ProjectService.getProjectByUser(token);
        const orgs = await OrgService.getOrgByUser(token);
        setUser((prev) => ({
          ...prev,
          userProjects: projects.data,
          userOrgs: orgs.data,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    getUserInfo();
  }, []);
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
              <Route component={NotFound} />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
}
