import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { Container } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiBellOutline } from "@mdi/js";
import { mdiEmailOutline } from "@mdi/js";
import logo from "../assets/isgoodai-logo.png";
import "../App.css";

export default function TopNav() {
  return (
    <Container>
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Navbar.Brand className="font-weight-bold text-muted">
          <LinkContainer to="/dashboard">
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
                <img
                  src="https://placeimg.com/24/24/people"
                  className="img-xs rounded-circle"
                  alt="profile"
                />
                <span className="mx-2">Profile Name</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <p>Home</p>
                </Dropdown.Item>
                <Dropdown.Item>
                  <p>Account</p>
                </Dropdown.Item>
                <Dropdown.Item>
                  <p>Logout</p>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
