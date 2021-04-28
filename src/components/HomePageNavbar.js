import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/isgoodai-logo.png";
import { useAuth0 } from "@auth0/auth0-react";

function HomePageNavbar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
      <Navbar.Brand className="font-weight-bold text-muted">
        <LinkContainer to="/">
          <Nav.Link>
            <img src={logo} alt="Logo" />
          </Nav.Link>
        </LinkContainer>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav activeKey={window.location.pathname}>
          {!isAuthenticated ? (
            <>
              <Nav.Link
                className="font-weight-bold"
                onClick={() =>
                  loginWithRedirect({
                    screen_hint: "signup",
                  })
                }
              >
                Signup
              </Nav.Link>

              <Nav.Link
                className="font-weight-bold"
                onClick={() => loginWithRedirect()}
              >
                Login
              </Nav.Link>
            </>
          ) : (
            <Nav.Link
              className="font-weight-bold"
              onClick={() =>
                logout({
                  returnTo: window.location.origin,
                })
              }
            >
              Logout
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default HomePageNavbar;
