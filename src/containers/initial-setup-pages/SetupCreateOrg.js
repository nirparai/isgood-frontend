import React from "react";

import HomePageNavbar from "components/HomePageNavbar";
import CreateOrganisationForm from "components/Forms/CreateOrganisationForm";

export default function SetupCreateOrg() {
  return (
    <div className="container">
      <HomePageNavbar />
      <CreateOrganisationForm setup={true} />
    </div>
  );
}
