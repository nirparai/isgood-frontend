import React from "react";
import { Row } from 'react-bootstrap';
import ProjectCard from "components/ProjectCard";

const OrgProjects = ({ projectsByOrg }) => {
  return (
    <Row className="d-flex justify-content-center py-5">
      {projectsByOrg.length > 0 ? (
        projectsByOrg.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))
        ) : (
          <h3>Looks like you have no projects</h3>
        )}
    </Row>
   );
};

export default OrgProjects;