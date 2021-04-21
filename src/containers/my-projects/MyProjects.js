import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import TopNav from "../../components/TopNav";
import SideNav from "../../components/SideNav";
import ProjectLayout from "./ProjectLayout";

const MyProjects = () => {
  return (
    <div>
      <TopNav />
      <Container>
        <Row>
          <Col className="col-3">
            <SideNav />
          </Col>
          <Col className="col-9">
            <ProjectLayout />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyProjects;
