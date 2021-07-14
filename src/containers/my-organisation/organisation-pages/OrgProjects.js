import React from "react";
import { Col, Row } from "react-bootstrap";
import ProjectCard from "components/ProjectCard";
import CreateProjectForm from "components/Forms/CreateProjectForm/CreateProjectForm";
import ModalContainer from "components/ModalContainer";

import Icon from "@mdi/react";
import { mdiMenu, mdiDotsGrid } from "@mdi/js";
import { Modal, Button } from "react-bootstrap";
const ToggleButton = () => {
  return <Button variant="primary">+ Create Project</Button>;
};

const OrgProjects = ({ orgId, projectsByOrg }) => {
  const FooterComponent = ({ handleClose, handleSave }) => {
    // ref to close and save modal || window.body.click() to close modal
    // save ->
    return (
      <Modal.Footer className="justify-content-evenly">
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    );
  };

  return (
    <>
      <Row>
        <Col className="col mt-3">
          <input placeholder="Filter (future release)" disabled />
        </Col>
        <Col className="col mt-3 d-flex justify-content-end">
          <ModalContainer
            modalTitle="Project Settings"
            toggleComponent={<ToggleButton />}
            modal={<CreateProjectForm setup={false} orgId={orgId} />}
            footerComponent={<FooterComponent />}
          />
        </Col>
        <Col className=" col-2 mt-3 d-flex justify-content-end">
          <Icon path={mdiMenu} size={1.3} className="p-1" />
          <Icon path={mdiDotsGrid} size={1.3} className="p-1" />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center py-5">
        {projectsByOrg.length > 0 ? (
          projectsByOrg.map((project, index) => (
            <ProjectCard project={project} key={index} />
          ))
        ) : (
          <h3>Looks like you have no projects</h3>
        )}
      </Row>
    </>
  );
};

export default OrgProjects;
