import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectService from "services/projectService";
import { useAuth0 } from "@auth0/auth0-react";

import { Container, Col, Row, Tab, Nav } from "react-bootstrap";
import Icon from "@mdi/react";
import {
  mdiShareVariant,
  mdiAccountCircle,
  mdiAccountMultiple,
  mdiPlus,
} from "@mdi/js";
import Overview from "./projects-pages/Overview";
import Indicators from "./projects-pages/Indicators";
import Team from "./projects-pages/Team";
import UserContext from "../../context/UserContext";
import { Loading } from "components/Loading";
import ProjectBanner from "components/ProjectBanner";

const ProjectPage = () => {
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
    <div>
      {!isLoading ? (
        <>
          <ProjectBanner project={user.currentProject} />
          <Container>
            <Row className="bg-light">
              <Col className="col-lg-2 col-12 d-flex justify-content-center">
                <Icon path={mdiAccountCircle} size={5} className="p-1" />
              </Col>
              <Col className="col-lg-7 col-12 d-flex align-items-center justify-content-lg-start justify-content-center">
                <p>{user.currentProject.name}</p>
              </Col>
              <Col className="col-lg-3 col-12 d-flex justify-content-end flex-column ">
                <Row className="">
                  <Col className=" col-12 d-flex justify-content-end">
                    <Icon path={mdiShareVariant} size={1} className="p-1" />
                  </Col>
                </Row>
                <Row>
                  <Col className=" col-12 d-flex align-items-end justify-content-end mt-3">
                    <Icon
                      path={mdiAccountMultiple}
                      className="mr-2 mb-3"
                      size={1}
                    />
                    <Icon
                      path={mdiAccountMultiple}
                      className="mr-2 mb-3"
                      size={1}
                    />
                    <Icon
                      path={mdiAccountMultiple}
                      className="mr-2 mb-3"
                      size={1}
                    />
                    <Icon
                      path={mdiAccountMultiple}
                      className="mr-2 mb-3"
                      size={1}
                    />
                    <Icon
                      path={mdiAccountMultiple}
                      className="mr-2 mb-3"
                      size={1}
                    />

                    <Icon path={mdiPlus} className="mr-2 mb-3" size={1} />
                  </Col>
                </Row>
              </Col>
            </Row>

            <Tab.Container id="left-tabs" defaultActiveKey="Overview">
              <Row className="mt-4">
                <Col lg={3} sm={12}>
                  <Nav variant="pills" className="sticky-top flex-column pt-2">
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Overview"
                        className="d-flex justify-content-center"
                      >
                        Overview
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Insights"
                        className="d-flex justify-content-center disabled"
                      >
                        Insights
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Indicators"
                        className="d-flex justify-content-center"
                      >
                        Indicators
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Dashboards"
                        className="d-flex justify-content-center disabled"
                      >
                        Dashboards
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Datasets"
                        className="d-flex justify-content-center disabled"
                      >
                        Datasets
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="Team"
                        className="d-flex justify-content-center disabled"
                      >
                        Team
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
                      <Indicators indicators={user.currentProject.indicators} />
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
