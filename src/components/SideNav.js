import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import ListGroup from "react-bootstrap/ListGroup";

export default function SideNav() {
  return (
    <Navbar className="bg-info h-100 w-100">
      {/*    <ListGroup>
        <ListGroup.Item active className="sidenav-item nav-item">
          Projects
        </ListGroup.Item>
        <ListGroup.Item className="nav-item">Dashboard</ListGroup.Item>
        <ListGroup.Item className="nav-item">Reports</ListGroup.Item>
        <ListGroup.Item className="nav-item">Sharing Center</ListGroup.Item>
        <ListGroup.Item className="nav-item">Organisation</ListGroup.Item>
      </ListGroup> */}
    </Navbar>
  );
}
