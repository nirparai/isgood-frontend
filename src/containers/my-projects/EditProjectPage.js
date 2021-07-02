import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserContext from "context/UserContext";
import ProjectService from "services/projectService";
import { useAuth0 } from "@auth0/auth0-react";

import { Container, Col, Row, Nav, Tab } from "react-bootstrap";
import ImpactsEdit from "components/Forms/CreateProjectForm/ProjectEditForms/ImpactsEdit";
import OutcomesEdit from "components/Forms/CreateProjectForm/ProjectEditForms/OutcomesEdit";
import ProjectInfoEdit from "components/Forms/CreateProjectForm/ProjectEditForms/ProjectInfoEdit";
import BeneficiaryGroupsEdit from "components/Forms/CreateProjectForm/ProjectEditForms/BeneficiaryGroupsEdit";

export default function EditProjectPage() {
  const { user, setUser } = useContext(UserContext);
  const { projectId } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProject = async () => {
      try {
        setIsLoading(true);
        const token = await getAccessTokenSilently();
        const project = await ProjectService.getProjectById(token, projectId);
        console.log(project.data);
        setUser((prev) => ({
          ...prev,
          currentProject: project.data,
        }));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getProject();
  }, []);

  console.log(user.currentProject);

  return (
    <>
      {!isLoading ? (
        <>
          <Container>
          <Tab.Container id="left-tabs" defaultActiveKey="project-details">
              <Row className="mt-4">
                <Col lg={3} sm={12}>
                  <Nav variant="pills" className="sticky-top flex-column pt-2">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="project-details"
                        className="d-flex"
                      >
                        Project Details
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="impacts"
                        className="d-flex"
                      >
                        Impacts
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="outcomes"
                        className="d-flex"
                      >
                        Outcomes
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="beneficiary-groups"
                        className="d-flex"
                      >
                        Beneficiary Groups
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={12} lg={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="project-details">
                      <ProjectInfoEdit project={user.currentProject} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="impacts">
                      <ImpactsEdit project={user.currentProject} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="outcomes">
                      <OutcomesEdit project={user.currentProject} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="beneficiary-groups">
                      <BeneficiaryGroupsEdit project={user.currentProject} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </>
      ) : null}
    </>
  );
}
