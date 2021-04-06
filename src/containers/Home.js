import React from "react";
import "./Home.css";
import HomePageNavbar from "../components/HomePageNavbar";

export default function Home() {
  return (
    <>
      <HomePageNavbar />
      <div className="Home">
        <div className="lander">
          <h1>isgood.ai</h1>
          <p className="text-muted">
            Social Impact and Outcomes Optimisation Platform
          </p>
        </div>
      </div>
    </>
  );
}
