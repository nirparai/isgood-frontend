import React from "react";
import { Row, Col } from "react-bootstrap";
import AWSImage from "./AWSImage";
import { mdiShareVariant } from "@mdi/js";
import Icon from "@mdi/react";
import EditOrganisationPage from "containers/my-organisation/EditOrganisationPage";
import ShareOrganisationPage from "containers/my-organisation/ShareOrganisationPage";
import ModalContainer from "./ModalContainer";
import { Button } from "react-bootstrap";
import { mdiCog } from "@mdi/js";

const OrgHeaderToggle = () => {
  return (
    <Button variant="secondary">
      <Icon path={mdiCog} size={1.5} className="p-1" />
    </Button>
  );
};

const OrgShareToggle = () => {
  return (
    <Button variant="primary" className="mr-2">
      <Icon path={mdiShareVariant} size={1.5} className="p-1" />
    </Button>
  );
};

export default function OrgHeader({ org }) {
  return (
    <Row className="bg-light">
      <Col className="col-lg-2 col-12 d-flex justify-content-center">
        <AWSImage
          location={org.logo && org.logo.location}
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
            <ModalContainer
              modalTitle="Share Organisation"
              toggleComponent={<OrgShareToggle />}
              modal={<ShareOrganisationPage />}
            />
            <ModalContainer
              modalTitle="Organisation Details Settings"
              toggleComponent={<OrgHeaderToggle />}
              modal={<EditOrganisationPage />}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
