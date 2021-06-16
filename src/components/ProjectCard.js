import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Icon from "@mdi/react";
import { mdiShareVariant, mdiDotsVertical } from "@mdi/js";
import AWSImage from "./AWSImage";

export default function ProjectCard({ project }) {
  return (
    <Col xs={12} md={6} xl={4} className="my-3">
      <Card className="h-100">
        <LinkContainer to={`/home/myprojects/${project.project_id}`}>
          <Card.Body>
            <Row>
              <Col xs={2}>
                <AWSImage
                  location={
                    project.project_logo && project.project_logo.location
                  }
                  alt="Organisation Logo"
                  width={35}
                />
              </Col>
              <Col xs={10}>
                <h4>{project.name}</h4>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <p>{project.description}</p>
              </Col>
            </Row>
          </Card.Body>
        </LinkContainer>
        <Card.Footer className="d-flex justify-content-end">
          <Icon path={mdiShareVariant} size={1.5} className="p-1" />
          {/* <LinkContainer to={`/home/myprojects/edit/${project.project_id}`}>
            <Icon path={mdiDotsVertical} size={1.5} className="p-1" />
          </LinkContainer> */}
        </Card.Footer>
      </Card>
    </Col>
  );
}
