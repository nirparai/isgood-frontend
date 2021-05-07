import React from "react";
import HomePageNavbar from "../../components/HomePageNavbar";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
export default function Welcome() {
  return (
    <>
      <HomePageNavbar />
      <div className="container text-center">
        <p style={{ fontSize: "3rem" }} className="my-5">
          Welcome
        </p>
        <p className="font-italic">
          Initial setup takes less than 15 minutes... yep, super fast and easy
        </p>
        <p className="font-weight-bold">
          1. Create Organisation | 2. Setup a Project | 3. Personalise | 4.
          Share with Team
        </p>
        <LinkContainer to="/setup/createorg">
          <Button className="my-5">Step 1: Create Organisation</Button>
        </LinkContainer>
        <div>
          <p>Watch Intro Video</p>
          <video width="320" height="240" controls></video>
        </div>
      </div>
    </>
  );
}
