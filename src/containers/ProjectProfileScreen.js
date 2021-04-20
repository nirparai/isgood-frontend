import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import ProfilePageNav from "../components/ProfilePageNav";
import ProfilePageSideNav from "../components/ProfilePageSideNav";
import ProjectLayout from "../components/ProjectLayout";

const ProjectProfileScreen = () => {
  return (
    <div>
      <ProfilePageNav />
      <Container>
        <Row>
          <Col className="col-3">
            <ProfilePageSideNav />
          </Col>
          <Col className="col-9">
            <ProjectLayout />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProjectProfileScreen;
