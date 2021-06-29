import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserContext from "context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";

import { Container, Col, Row, Tab, Nav } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMenu, mdiDotsGrid } from "@mdi/js";
import OrgBanner from "components/OrgBanner";
import OrgHeader from "components/OrgHeader";
import OrgDetails from "./organisation-pages/OrgDetails";
import OrgProjects from "./organisation-pages/OrgProjects";
import userService from "services/userService";
import CreateProjectModalButton from "containers/my-projects/CreateProjectModalButton";
import CreateProjectForm from "components/Forms/CreateProjectForm/CreateProjectForm";

export default function OrganisationPage() {
  const { orgId } = useParams();
  const { user, setUser } = useContext(UserContext);
  const { getAccessTokenSilently } = useAuth0();

  let projectsByOrg = [];
  if (user.userProjects) {
    projectsByOrg = user.userProjects.filter(
      (project, index) => project.org_id === orgId
    );
  }
  let currentOrg = {};
  if (user.userOrgs) {
    currentOrg = user.userOrgs.find((org, index) => org.id === orgId);
  }
  //set last org
  useEffect(() => {
    const updateLastOrg = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await userService.updateLastOrg(orgId, token);
        console.log(res.data);
        setUser((prev) => ({
          ...prev,
          userData: res.data,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    updateLastOrg();
  }, [orgId]);

  console.log(currentOrg);
  return (
    <div>
      <OrgBanner org={currentOrg} />
      <OrgHeader org={currentOrg} />
      <Container>
        <Tab.Container id="left-tabs" defaultActiveKey="org-details">
          <Row className="mt-4">
            <Col lg={3} sm={12}>
              <Nav variant="pills" className="sticky-top flex-column pt-2">
                <Nav.Item>
                  <Nav.Link
                    eventKey="org-details"
                    className="d-flex justify-content-center"
                  >
                    Org Details
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link
                    eventKey="org-projects"
                    className="d-flex justify-content-center my-2"
                  >
                    Org Projects
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={12} lg={9}>
              <Tab.Content>
                <Tab.Pane eventKey="org-details">
                  <OrgDetails org={currentOrg} />
                </Tab.Pane>
                <Tab.Pane eventKey="org-projects">
                <Row>
                  <Col className="col mt-3">
                    <input placeholder="Filter (future release)" disabled />
                  </Col>
                  <Col className="col mt-3 d-flex justify-content-end">
                    <CreateProjectModalButton>
                      <CreateProjectForm setup={false} orgId={orgId} />
                    </CreateProjectModalButton>
                  </Col>
                  <Col className=" col-2 mt-3 d-flex justify-content-end">
                    <Icon path={mdiMenu} size={1.3} className="p-1" />
                    <Icon path={mdiDotsGrid} size={1.3} className="p-1" />
                  </Col>
                </Row>
                <OrgProjects projectsByOrg={projectsByOrg} />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </div>
  );
}
