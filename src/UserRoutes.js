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
import EditOrganisationPage from "./containers/my-organisation/EditOrganisationPage";
import OrganisationsLayout from "./containers/my-organisation/OrganisationsLayout";
import ProjectPage from "./containers/my-projects/ProjectPage";
import ProjectsLayout from "./containers/my-projects/ProjectsLayout";
import NotFound from "./containers/NotFound";
import { Loading } from "components/Loading";

export default function UserRoutes() {
  const { getAccessTokenSilently } = useAuth0();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        setUser((prev) => ({ ...prev, isLoadingData: true }));
        const token = await getAccessTokenSilently();
        const projects = await ProjectService.getProjectByUser(token);
        const orgs = await OrgService.getOrgByUser(token);
        setUser((prev) => ({
          ...prev,
          userProjects: projects.data,
          userOrgs: orgs.data,
          isLoadingData: false,
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
            {!user.isLoadingData ? (
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

                <Route
                  exact
                  path="/home/myprojects"
                  component={ProjectsLayout}
                />
                <Route
                  exact
                  path="/home/myprojects/:projectId"
                  component={ProjectPage}
                />
                <Route component={NotFound} />
              </Switch>
            ) : (
              <Loading />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}
