import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";
import AWSImage from "./AWSImage";

export default function OrgCard({ org }) {
  return (
    <Col xs={12} md={6} xl={4} className="my-3">
      <Card className="justify-content-center">
        <LinkContainer to={`myorganisations/${org.org_id}`}>
          <Card.Body className="p-0 d-flex justify-content-center">
<<<<<<< HEAD
            <img
              src={
                org.logo_location
                  ? `http://localhost:8000/api/images/${org.logo_location}`
                  : null
              }
=======
            <AWSImage
              location={org.org_logo.location}
>>>>>>> cb5a2c57d99cdcff4f6070f9efe696af0f096de4
              alt="Organisation Logo"
              height={180}
            />
          </Card.Body>
        </LinkContainer>
        <Card.Footer>
          <Row>
            <Col>
              <h4>{org.name}</h4>
            </Col>
            <Col className="align-items-center d-flex justify-content-end">
              <LinkContainer to={`myorganisations/edit/${org.org_id}`}>
                <Icon path={mdiDotsVertical} size={1} />
              </LinkContainer>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
}
