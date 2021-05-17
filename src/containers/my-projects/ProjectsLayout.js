import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

import { Container, Col, Row } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMenu, mdiDotsGrid } from "@mdi/js";
import { LinkContainer } from "react-router-bootstrap";

export default function ProjectsLayout() {
  const { user, setUser } = useContext(UserContext);

  console.log(user);
  return (
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
        {user.userProjects &&
          user.userProjects.map((project, index) => (
            <Col
              key={project.projectId}
              md={2}
              sm={3}
              xs={5}
              className="p-1 m-2"
            >
              <LinkContainer to={`myprojects/${project.projectId}`}>
                <div className="card d-flex justify-content-center">
                  <img
                    src="https://placeimg.com/620/620/any"
                    alt="Organisation Logo"
                  />
                  <h4 className="text-center">{project.name}</h4>
                </div>
              </LinkContainer>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
