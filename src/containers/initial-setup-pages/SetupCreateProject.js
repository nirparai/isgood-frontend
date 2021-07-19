import React from "react";

import HomePageNavbar from "components/HomePageNavbar";
import CreateProjectForm from "components/Forms/CreateProjectForm/CreateProjectForm";

export default function SetupCreateProject() {
  return (
    <div className="container">
      <HomePageNavbar />
      <CreateProjectForm setup={true} />
    </div>
  );
}
