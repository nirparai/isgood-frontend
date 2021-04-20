import React from "react";
import HomePageNavbar from "../components/HomePageNavbar";

export default function NotFound() {
  return (
    <>
      <HomePageNavbar />
      <div className="text-center">
        <h3>Sorry, page not found!</h3>
      </div>
    </>
  );
}
