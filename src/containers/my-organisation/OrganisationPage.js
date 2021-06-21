import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserContext from "context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";

import { Container, Col, Row } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMenu, mdiDotsGrid } from "@mdi/js";
import ProjectCard from "components/ProjectCard";
import OrgBanner from "components/OrgBanner";
import userService from "services/userService";
import CreateProjectModalButton from "containers/my-projects/CreateProjectModalButton";
import CreateProjectForm from "components/Forms/CreateProjectForm/CreateProjectForm";

export default function OrganisationPage() {
  const { orgId } = useParams();
  const { user, setUser } = useContext(UserContext);
  const { getAccessTokenSilently } = useAuth0();

  let projectsByOrg = [];
  if (user.userProjects) {
    projectsByOrg = user.userProjects.filter(
      (project, index) => project.org_id === orgId
    );
  }
  let currentOrg = {};
  if (user.userOrgs) {
    currentOrg = user.userOrgs.find((org, index) => org.org_id === orgId);
  }
  //set last org
  useEffect(() => {
    const updateLastOrg = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await userService.updateLastOrg(orgId, token);
        console.log(res.data);
        setUser((prev) => ({
          ...prev,
          userData: res.data,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    updateLastOrg();
  }, [orgId]);

  console.log(currentOrg);
  return (
    <div>
      <OrgBanner org={currentOrg} />
      <Container>
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
      </Container>
    </div>
  );
}
