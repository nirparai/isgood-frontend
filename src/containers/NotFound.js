import React from "react";
import HomePageNavbar from "../components/HomePageNavbar";
// Need to be updated to look a better and have a return to home page or something similar
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
