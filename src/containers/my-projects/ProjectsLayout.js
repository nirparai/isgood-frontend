import React, { useContext } from "react";
import UserContext from "context/UserContext";

import { Container, Col, Row } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMenu, mdiDotsGrid } from "@mdi/js";
import ProjectCard from "components/ProjectCard";
import CreateProjectModalButton from "./CreateProjectModalButton";
import CreateProjectForm from "components/CreateProjectForm/CreateProjectForm";

export default function ProjectsLayout() {
  const { user, setUser } = useContext(UserContext);

  console.log(user);
  return (
    <Container>
      <div className="my-5">
        <h1>My Projects</h1>
      </div>
      <Row>
        <Col className="col mt-3">
          <input placeholder="Filter (future release)" disabled />
        </Col>
        <Col className="col mt-3 d-flex justify-content-end">
          <CreateProjectModalButton>
            <CreateProjectForm setup={false} />
          </CreateProjectModalButton>
        </Col>
        <Col className=" col-2 mt-3 d-flex justify-content-end">
          <Icon path={mdiMenu} size={1.3} className="p-1" />
          <Icon path={mdiDotsGrid} size={1.3} className="p-1" />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center py-5">
        {user.userProjects &&
          user.userProjects.map((project, index) => (
            <ProjectCard project={project} key={project.project_id} />
          ))}
      </Row>
    </Container>
  );
}
