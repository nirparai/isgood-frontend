import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav, Dropdown, Badge } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiBellOutline } from "@mdi/js";
import { mdiEmailOutline } from "@mdi/js";
import logo from "assets/isgoodai-logo.png";
import UpdateProfileModalButton from "containers/my-profile/UpdateProfileModalButton";

import ProfileModalButton from "containers/my-profile/ProfileModalButton";
<<<<<<< HEAD
import ProfilePage from "containers/my-profile/ProfilePage";
import ProfilePageEdit from "containers/my-profile/ProfilePageEdit";
import PersonaliseForm from "./PersonaliseForm";
=======
import UserProfilePage from "containers/my-profile/UserProfilePage";
import EditProfilePage from "containers/my-profile/EditProfilePage";
import AWSImage from "./AWSImage";
>>>>>>> cb5a2c57d99cdcff4f6070f9efe696af0f096de4

export default function TopNav({ user }) {
  const { logout } = useAuth0();

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
                <Badge variant="info">7</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu className="navbar-dropdown preview-list">
                <Dropdown.Item>
                  <p>You have 7 notifications </p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="mx-2">
              <Dropdown.Toggle className="nav-link count-indicator toggle-arrow-hide bg-transparent">
                <Icon path={mdiEmailOutline} size={1} />
                <Badge variant="info">1</Badge>
              </Dropdown.Toggle>
            </Dropdown>

            <Dropdown className="mx-2">
              <Dropdown.Toggle className="nav-link bg-transparent">
<<<<<<< HEAD
                <img
                  src={`http://localhost:8000/api/images/${user.userData.user_metadata.profileImageLocation}`}
=======
                <AWSImage
                  location={
                    user.userData.user_metadata.profileImageLocation
                      ? user.userData.user_metadata.profileImageLocation
                      : null
                  }
>>>>>>> cb5a2c57d99cdcff4f6070f9efe696af0f096de4
                  className="img-xs rounded-circle"
                  width={24}
                  alt="profile"
                />
<<<<<<< HEAD
=======

>>>>>>> cb5a2c57d99cdcff4f6070f9efe696af0f096de4
                <span className="mx-2">{user.userData.email}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <ProfileModalButton>
<<<<<<< HEAD
                    <ProfilePage />
=======
                    <UserProfilePage />
>>>>>>> cb5a2c57d99cdcff4f6070f9efe696af0f096de4
                  </ProfileModalButton>
                </Dropdown.Item>
                <Dropdown.Item>
                  <UpdateProfileModalButton>
<<<<<<< HEAD
                    <PersonaliseForm userData={user.userData} setup={false} />
=======
                    <EditProfilePage />
>>>>>>> cb5a2c57d99cdcff4f6070f9efe696af0f096de4
                  </UpdateProfileModalButton>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    logout({
                      returnTo: window.location.origin,
                    })
                  }
                >
                  <p>Logout</p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
