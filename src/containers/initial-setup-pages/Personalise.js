import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { Formik } from "formik";
import { Button, Col, Form } from "react-bootstrap";
import FormErrorMessage from "components/FormErrorMessage";
import HomePageNavbar from "components/HomePageNavbar";
import UserService from "services/userService";
import PersonaliseForm from "components/PersonaliseForm";

//This is not working and needs to be connected to auth0 management api so that the infomation is stored to the AUTH0 user meta-data
//Timezone and Location options need to be filled

export default function Personalise() {
  return (
    <div className="container">
      <HomePageNavbar />
      <div className="d-flex flex-column align-items-center">
        <PersonaliseForm setup />
      </div>
    </div>
  );
}
