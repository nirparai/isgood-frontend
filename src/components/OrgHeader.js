import React from "react";
import { Row, Col } from "react-bootstrap";
import AWSImage from "./AWSImage";
import {
  mdiShareVariant
} from "@mdi/js";
import Icon from "@mdi/react";
import { LinkContainer } from "react-router-bootstrap";
import EditOrgModalButton from "containers/my-organisation/EditOrgModalButton";
import EditOrganisationPage from "containers/my-organisation/EditOrganisationPage";

export default function OrgHeader({org}) {
 return (
    <Row className="bg-light">
      <Col className="col-lg-2 col-12 d-flex justify-content-center">       
        <AWSImage
          location={
            org.logo &&
            org.logo.location
          }
          width={150}
          height={150}
        />
      </Col>
      <Col className="col-lg-7 col-12 d-flex align-items-center justify-content-lg-start justify-content-center">
        <h1>{org.name}</h1>
      </Col>
      <Col className="col-lg-3 col-12 d-flex justify-content-end flex-column ">
        <Row className="">
          <Col className=" col-12 d-flex justify-content-end">
            <Icon path={mdiShareVariant} size={1.5} className="p-1" />
            <EditOrgModalButton>
              <EditOrganisationPage />
            </EditOrgModalButton>
            {/* <LinkContainer
              to={`/home/myprojects/edit/${org.project_id}`}
            >
              <Icon path={mdiCog} size={1.5} className="p-1" />
            </LinkContainer> */}
          </Col>
        </Row>
      </Col>
    </Row>
  );
}