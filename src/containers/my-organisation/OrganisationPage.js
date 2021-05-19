import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import UserContext from "../../context/UserContext";

import { Container, Col, Row } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMenu, mdiDotsGrid } from "@mdi/js";
import ProjectCard from "../../components/ProjectCard";

export default function OrganisationPage() {
  const { orgId } = useParams();
  const { user, setUser } = useContext(UserContext);

  let projectByOrg = [];
  if (user.userProjects) {
    projectByOrg = user.userProjects.filter(
      (project, index) => project.orgId == orgId
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-center py-5 border">ORG BANNER</h1>
      </div>
      <Container>
        <Row>
          <Col className=" col-6 mt-3">
            <input placeholder="Filter (future release)" disabled />
          </Col>
          <Col className=" col-6 mt-3 d-flex justify-content-end">
            <Icon path={mdiMenu} size={1.3} className="p-1" />
            <Icon path={mdiDotsGrid} size={1.3} className="p-1" />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center py-5">
          {projectByOrg &&
            projectByOrg.map((project, index) => (
              <ProjectCard project={project} key={index} />
            ))}
        </Row>
      </Container>
    </div>
  );
}
