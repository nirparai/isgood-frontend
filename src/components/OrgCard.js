import React from "react";
import { Card, Col, Row, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Icon from "@mdi/react";
import {
  mdiCogOutline,
  mdiClipboardTextOutline,
  mdiViewGridOutline,
} from "@mdi/js";
import AWSImage from "./AWSImage";
import DropdownIcon from "components/DropdownIcon";

export default function OrgCard({ org }) {
  return (
    <Col xs={12} md={6} xl={4} className="my-3">
      <Card className="justify-content-center">
        <LinkContainer to={`myorganisations/${org.org_id}`}>
          <Card.Body className="p-0 d-flex justify-content-center">
            <AWSImage
              location={org.logo && org.logo.location}
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
              <Dropdown>
                <Dropdown.Toggle
                  as={DropdownIcon}
                  id="dropdown-basic"
                ></Dropdown.Toggle>

                <Dropdown.Menu>
                  <LinkContainer to={`myorganisations/${org.org_id}`}>
                    <Dropdown.Item href="#/action-1">
                      <div className="d-flex">
                        <Icon path={mdiViewGridOutline} size={1} />
                        <p className="mx-2">Organisation Details</p>
                      </div>
                    </Dropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`myorganisations/${org.org_id}`}>
                    <Dropdown.Item href="#/action-2">
                      <div className="d-flex">
                        <Icon path={mdiClipboardTextOutline} size={1} />
                        <p className="mx-2">Organisation Projects</p>
                      </div>
                    </Dropdown.Item>
                  </LinkContainer>
                  <LinkContainer to={`myorganisations/edit/${org.org_id}`}>
                    <Dropdown.Item href="#/action-3">
                      <div className="d-flex">
                        <Icon path={mdiCogOutline} size={1} />
                        <p className="mx-2">Settings</p>
                      </div>
                    </Dropdown.Item>
                  </LinkContainer>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
}
