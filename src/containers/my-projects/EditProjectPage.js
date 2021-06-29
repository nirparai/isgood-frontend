import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserContext from "context/UserContext";
import ProjectService from "services/projectService";
import { useAuth0 } from "@auth0/auth0-react";

import { Container, Col, Row, Accordion, Card, Button } from "react-bootstrap";
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
          <div>
            <h1 className="text-center py-5 border">PROJECT BANNER</h1>
          </div>
          <Container>
            <Accordion defaultActiveKey="0">
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                  Project Info
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <ProjectInfoEdit project={user.currentProject} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="1">
                  Impacts
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    <ImpactsEdit project={user.currentProject} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="2">
                  Outcomes
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    <OutcomesEdit project={user.currentProject} />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
              <Card>
                <Accordion.Toggle as={Card.Header} eventKey="3">
                  Beneficiary Groups
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="3">
                  <Card.Body>
                    <BeneficiaryGroupsEdit
                      project={user.currentProject}
                      beneficiaries={user.currentProject.beneficiaries}
                      orgId={user.currentProject.org_id}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
            <Button>Update</Button>
          </Container>
        </>
      ) : null}
    </>
  );
}
