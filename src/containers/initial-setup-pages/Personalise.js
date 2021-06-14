import React from "react";

import HomePageNavbar from "components/HomePageNavbar";
import PersonaliseForm from "components/Forms/PersonaliseForm";

//This is not working and needs to be connected to auth0 management api so that the infomation is stored to the AUTH0 user meta-data
//Timezone and Location options need to be filled

export default function Personalise() {
  return (
    <div className="container">
      <HomePageNavbar />
      <PersonaliseForm setup={true} />
    </div>
  );
}
