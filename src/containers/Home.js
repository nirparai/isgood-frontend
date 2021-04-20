import React from "react";
import HomePageNavbar from "../components/HomePageNavbar";

export default function Home() {
  return (
    <div className="container">
      <HomePageNavbar />
      <div className="text-center mt-5">
        <h1 className="my-4">isgood.ai</h1>
        <p className="text-muted">
          Social Impact and Outcomes Optimisation Platform
        </p>
      </div>
    </div>
  );
}
