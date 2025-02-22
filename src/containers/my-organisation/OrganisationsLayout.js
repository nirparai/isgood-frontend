import React, { useContext } from "react";
import UserContext from "context/UserContext";

import { Container, Col, Row, Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMenu, mdiDotsGrid } from "@mdi/js";
import OrgCard from "components/OrgCard";
import CreateOrgModalButton from "./CreateOrgModalButton";
import CreateOrganisationForm from "components/Forms/CreateOrganisationForm";
export default function OrganisationsLayout() {
  const { user } = useContext(UserContext);

  return (
    <Container>
      <div className="my-5">
        <h1>My Organisations</h1>
      </div>
      <Row>
        <Col className="col mt-3">
          <input placeholder="Filter (future release)" disabled />
        </Col>
        <Col className="col mt-3 d-flex justify-content-end">
          <CreateOrgModalButton>
            <CreateOrganisationForm setup={false} />
          </CreateOrgModalButton>
        </Col>
        <Col className=" col-2 mt-3 d-flex justify-content-end">
          <Icon path={mdiMenu} size={1.3} className="p-1" />
          <Icon path={mdiDotsGrid} size={1.3} className="p-1" />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center py-5">
        {user.userOrgs &&
          user.userOrgs.map((org, index) => <OrgCard key={org.id} org={org} />)}
      </Row>
    </Container>
  );
}
