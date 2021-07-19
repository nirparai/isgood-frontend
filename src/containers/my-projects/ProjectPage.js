import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectService from "services/projectService";
import { useAuth0 } from "@auth0/auth0-react";

import { Container, Col, Row, Tab, Nav } from "react-bootstrap";
import Overview from "./projects-pages/Overview";
import Indicators from "./projects-pages/Indicators";
import Team from "./projects-pages/Team";
import UserContext from "../../context/UserContext";
import { Loading } from "components/Loading";
import ProjectBanner from "components/ProjectBanner";
import ProjectHeader from "components/ProjectHeader";
import userService from "services/userService";

const ProjectPage = () => {
  const { user, setUser } = useContext(UserContext);
  const { projectId } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setIsLoading] = useState(true);

  //sample Indicators

  const indicators = [
    {
      name: "Indicator1",
      description: "Indicator description",
      code: "IRIS50-FP2321",
    },
    {
      name: "Indicator2",
      description: "Indicator description",
      code: "IRIS50-FP2321",
    },
    {
      name: "Indicator3",
      description: "Indicator description",
      code: "IRIS50-FP2321",
    },
    {
      name: "Indicator4",
      description: "Indicator description",
      code: "IRIS50-FP2321",
    },
    {
      name: "Indicator5",
      description: "Indicator description",
      code: "IRIS50-FP2321",
    },
  ];

  let currentProject = {};
  if (user.userProjects) {
    currentProject = user.userProjects.find(
      (project, index) => projectId === project.id
    );
  }

  useEffect(() => {
    const getProject = async () => {
      try {
        setIsLoading(true);
        const token = await getAccessTokenSilently();
        const project = await ProjectService.getProjectById(
          token,
          projectId,
          currentProject.org_id
        );
        setUser((prev) => ({
          ...prev,
          currentProject: project.data,
        }));
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    const updateLastOrg = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await userService.updateLastOrg(
          currentProject.org_id,
          token
        );
        setUser((prev) => ({ ...prev, userData: res.data }));
      } catch (err) {
        console.log(err);
      }
    };
    updateLastOrg();
    getProject();
  }, [setUser, getAccessTokenSilently, projectId, currentProject.org_id]);

  console.log(user.currentProject);
  return (
    <div>
      {!isLoading ? (
        <>
          <ProjectBanner project={user.currentProject} />
          <ProjectHeader project={user.currentProject} />
          <Container>
            <Tab.Container id="left-tabs" defaultActiveKey="Overview">
              <Row className="mt-4">
                <Col lg={3} sm={12}>
                  <Nav variant="pills" className="sticky-top flex-column pt-2">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Overview"
                        className="d-flex justify-content-center"
                      >
                        Details
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link
                        eventKey="Indicators"
                        className="d-flex justify-content-center my-2"
                      >
                        Indicators
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Team"
                        className="d-flex justify-content-center my-2"
                        disabled
                      >
                        Team
                      </Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                      <Nav.Link
                        eventKey="Insights"
                        className="d-flex justify-content-center my-2"
                        disabled
                      >
                        Insights
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Datasets"
                        className="d-flex justify-content-center my-2"
                        disabled
                      >
                        Datasets
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
                <Col sm={12} lg={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="Overview">
                      <Overview project={user.currentProject} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="Indicators">
                      {/* <Indicators indicators={user.currentProject.indicators} />                        Previous iteration*/}
                      <Indicators indicators={indicators} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="Team">
                      <Team />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProjectPage;
