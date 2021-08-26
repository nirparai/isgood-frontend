import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import AWSImage from "./AWSImage";
import { mdiShareVariant, mdiAccountMultiple, mdiPlus, mdiCog } from "@mdi/js";
import Icon from "@mdi/react";
import ModalContainer from "components/ModalContainer";
import EditProjectPage from "containers/my-projects/EditProjectPage";
import ShareProjectPage from "containers/my-projects/ShareProjectPage";
import { Button } from "react-bootstrap";

const TriggerButton = () => {
  return (
    <Button variant="secondary">
      <Icon path={mdiCog} size={1.5} className="p-1" />
    </Button>
  );
};

const TriggerShareButton = () => {
  return (
    <Button variant="primary" className="mr-2">
      <Icon path={mdiShareVariant} size={1.5} className="p-1" />
    </Button>
  );
};


export default function ProjectHeader({ project }) {
  return (
    <Row className="bg-light">
      <Col className="col-lg-2 col-12 d-flex justify-content-center">
        <AWSImage
          location={project.logo && project.logo.location}
          width={150}
          height={150}
        />
      </Col>
      <Col className="col-lg-7 col-12 d-flex align-items-center justify-content-lg-start justify-content-center">
        <h1>{project.name}</h1>
      </Col>
      <Col className="col-lg-3 col-12 d-flex justify-content-end flex-column ">
        <Row className="">
          <Col className=" col-12 d-flex justify-content-end">
            <ModalContainer
              modalTitle="Share Project"
              toggleComponent={<TriggerShareButton />}
              modal={<ShareProjectPage />}
            />
            <ModalContainer
              modalTitle="Project Settings"
              toggleComponent={<TriggerButton />}
              modal={<EditProjectPage />}
            >
              {/* iconReveal added to reuse component */}
            </ModalContainer>
          </Col>
        </Row>
        <Row>
          <Col className=" col-12 d-flex align-items-end justify-content-end mt-3">
            <Icon path={mdiAccountMultiple} className="mr-2 mb-3" size={1} />
            <Icon path={mdiAccountMultiple} className="mr-2 mb-3" size={1} />
            <Icon path={mdiAccountMultiple} className="mr-2 mb-3" size={1} />
            <Icon path={mdiAccountMultiple} className="mr-2 mb-3" size={1} />
            <Icon path={mdiAccountMultiple} className="mr-2 mb-3" size={1} />

            <Icon path={mdiPlus} className="mr-2 mb-3" size={1} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
