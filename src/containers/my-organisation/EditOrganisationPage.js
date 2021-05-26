import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "context/UserContext";

import { Container, Col, Row } from "react-bootstrap";
import CreateOrganisationForm from "components/CreateOrganisationForm";

export default function EditOrganisationPage() {
  const { orgId } = useParams();
  const { user, setUser } = useContext(UserContext);

  let orgbyId = [];
  if (user.userOrgs) {
    orgbyId = user.userOrgs.filter((org, index) => org.org_id == orgId);
  }

  const [orgValues] = orgbyId;

  return (
    <div>
      <div>
        <h1 className="text-center py-5 border">ORG BANNER</h1>
      </div>
      <Container>
        <CreateOrganisationForm orgValues={orgValues} />
      </Container>
    </div>
  );
}
