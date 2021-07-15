import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Dropdown, Badge } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiBellOutline, mdiLogout, mdiEmailOutline } from "@mdi/js";
import logo from "assets/isgoodai-logo.png";
import UpdateProfileModalButton from "containers/my-profile/UpdateProfileModalButton";

import ProfileModalButton from "containers/my-profile/ProfileModalButton";
import UserProfilePage from "containers/my-profile/UserProfilePage";
import EditProfilePage from "containers/my-profile/EditProfilePage";
import AWSImage from "./AWSImage";
import PersonaliseForm from "./Forms/PersonaliseForm";

export default function TopNav({ user }) {
  const { logout } = useAuth0();
  const history = useHistory();

  return (
    <>
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Navbar.Brand className="font-weight-bold text-muted">
          <LinkContainer to="/home">
            <Nav.Link>
              <img src={logo} alt="Logo" />
            </Nav.Link>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Dropdown className="mx-2">
              <Dropdown.Toggle className="nav-link count-indicator toggle-arrow-hide bg-transparent">
                <Icon path={mdiBellOutline} size={1} />
                <Badge variant="info">1</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu className="navbar-dropdown preview-list">
                <Dropdown.Item>
                  <p>You have 1 notifications </p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="mx-2">
              <Dropdown.Toggle className="nav-link count-indicator toggle-arrow-hide bg-transparent">
                <Icon path={mdiEmailOutline} size={1} />
                <Badge variant="info">1</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu className="navbar-dropdown preview-list">
                <Dropdown.Item>
                  <p>You have 1 notifications </p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="mx-2">
              <Dropdown.Toggle className="nav-link bg-transparent">
                <AWSImage
                  location={
                    user.userData.user_metadata.profileImageLocation
                      ? user.userData.user_metadata.profileImageLocation
                      : null
                  }
                  className="img-xs rounded-circle"
                  width={24}
                  alt="profile"
                />

                <span className="mx-2">{user.userData.email}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <ProfileModalButton>
                    <UserProfilePage />
                  </ProfileModalButton>
                </Dropdown.Item>
                <Dropdown.Item>
                  <UpdateProfileModalButton>
                    <PersonaliseForm userData={user.userData} setup={false} />
                  </UpdateProfileModalButton>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    logout({
                      returnTo: history.push("/logout"),
                    })
                  }
                >
                  <div className="d-flex">
                    <Icon path={mdiLogout} size={1} className="mx-2" />
                    <p>Logout</p>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
