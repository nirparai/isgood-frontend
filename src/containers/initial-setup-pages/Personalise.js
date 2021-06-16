import React from "react";

import HomePageNavbar from "components/HomePageNavbar";
<<<<<<< HEAD
import UserService from "services/userService";
import PersonaliseForm from "components/PersonaliseForm";
=======
import PersonaliseForm from "components/Forms/PersonaliseForm";
>>>>>>> cb5a2c57d99cdcff4f6070f9efe696af0f096de4

//This is not working and needs to be connected to auth0 management api so that the infomation is stored to the AUTH0 user meta-data
//Timezone and Location options need to be filled

export default function Personalise() {
  return (
    <div className="container">
      <HomePageNavbar />
<<<<<<< HEAD
      <div className="d-flex flex-column align-items-center">
        <PersonaliseForm setup />
      </div>
=======
      <PersonaliseForm setup={true} />
>>>>>>> cb5a2c57d99cdcff4f6070f9efe696af0f096de4
    </div>
  );
}
