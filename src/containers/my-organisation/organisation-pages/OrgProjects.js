import React from "react";
import { Col, Row } from "react-bootstrap";
import ProjectCard from "components/ProjectCard";
import CreateProjectModalButton from "containers/my-projects/CreateProjectModalButton";
import CreateProjectForm from "components/Forms/CreateProjectForm/CreateProjectForm";

import Icon from "@mdi/react";
import { mdiMenu, mdiDotsGrid } from "@mdi/js";


const OrgProjects = ({orgId, projectsByOrg }) => {
  return (
    <>
      <Row>
        <Col className="col mt-3">
          <input placeholder="Filter (future release)" disabled />
        </Col>
        <Col className="col mt-3 d-flex justify-content-end">
          <CreateProjectModalButton>
            <CreateProjectForm setup={false} orgId={orgId} />
          </CreateProjectModalButton>
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