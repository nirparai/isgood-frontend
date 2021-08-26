// Card component for displaying a Project in the ProjectsLayout.js page
// Also handles directing to the specific project route "/myprojects/:projectId"

import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Icon from "@mdi/react";
import { mdiShareVariant } from "@mdi/js";
import ModalContainer from "components/ModalContainer";
import ShareProjectPage from "containers/my-projects/ShareProjectPage";
import AWSImage from "./AWSImage";


const TriggerShareButton = () => {
  return (
    <Button variant="secondary">
      <Icon path={mdiShareVariant} size={1.5} className="p-1" />
    </Button>
  );
};

export default function ProjectCard({ project }) {
  return (
    <Col xs={12} md={6} xl={4} className="my-3">
      <Card className="h-100">
        <LinkContainer to={`/home/myprojects/${project.id}`}>
          <Card.Body>
            <Row>
              <Col xs={2}>
                <AWSImage
                  location={project.logo && project.logo.location}
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
          <ModalContainer
            modalTitle="Share Project"
            toggleComponent={<TriggerShareButton />}
            modal={<ShareProjectPage />}
          />
        </Card.Footer>
      </Card>
    </Col>
  );
}
