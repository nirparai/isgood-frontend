import React, { useContext, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserService from "services/user";
import UserContext from "context/UserContext";

import { Container, Col, Row } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiMenu, mdiDotsGrid } from "@mdi/js";
import { useRouteMatch } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import OrgCard from "components/OrgCard";

export default function OrganisationsLayout() {
  const { getAccessTokenSilently } = useAuth0();
  const { user, setUser } = useContext(UserContext);
  const { path, url } = useRouteMatch();

  // get the projects a user is part of on load
  useEffect(() => {
    const getOrgs = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await UserService.getOrg(token);
        console.log(res.data);
        console.log(res);
        setUser((prev) => ({ ...prev, userOrgs: res.data }));
      } catch (err) {
        console.log(err);
      }
    };
    getOrgs();
  }, []);

  console.log(user);

  return (
    <Container>
      <Row>
        <Col className=" col-6 mt-3">
          <input placeholder="Filter (future release)" disabled />
        </Col>
        <Col className=" col-6 mt-3 d-flex justify-content-end">
          <Icon path={mdiMenu} size={1.3} className="p-1" />
          <Icon path={mdiDotsGrid} size={1.3} className="p-1" />
        </Col>
      </Row>
      <Row className="d-flex justify-content-center py-5">
        {user.userOrgs &&
          user.userOrgs.map((org, index) => (
            <OrgCard key={org.orgId} org={org} />
          ))}
      </Row>
    </Container>
  );
}
