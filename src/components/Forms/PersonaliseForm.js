import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { Formik } from "formik";
import { Button, Col, Form } from "react-bootstrap";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import UserService from "services/userService";
import DropzoneProfile from "../DropzoneProfile";
import UserContext from "context/UserContext";
import UserRoutes from "UserRoutes";

//This is not working and needs to be connected to auth0 management api so that the infomation is stored to the AUTH0 user meta-data
//Timezone and Location options need to be filled

export default function PersonaliseForm({ userData, setup }) {
  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const { user, setUser } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    handle: Yup.string(),
    privacy: Yup.string(),
    location: Yup.string(),
    timezone: Yup.string(),
  });

  const onSubmit = async (values, methods) => {
    try {
      const token = await getAccessTokenSilently();
      const userRes = await UserService.updateUser(values, token);
      console.log(userRes);

      setUser((state) => {
        return { ...state, userData: userRes.data };
      });
      document.getElementById('userProfileModalClose').click();

      // move to next setup page
      if (setup) {
        history.push("/setup/createorg");
      } else {
      }
    } catch (err) {
      // need to add different error handling either here or on the backend to
      // handle the difference between an error on the isgood side or the auth0 side
      console.log(err.response);
      if (
        err.response.data.message &&
        typeof err.response.data.message == "string"
      ) {
        const errMessage = err.response.data.message;
        setServerMessage(errMessage);
      } else {
        setServerMessage("There was a problem please try again later");
      }
    }
  };

  console.log(user);
  return (
    <>
      {serverMessage ? (
        <div
          className="alert alert-danger d-flex justify-content-center w-25"
          role="alert"
        >
          {serverMessage}
        </div>
      ) : null}
      <fieldset className="container-fluid p-3 rounded w-100">
        <Formik
          initialValues={{
            firstName: userData ? userData.given_name : "",
            lastName: userData ? userData.family_name : "",
            email: user.userData.email,
            handle: userData ? userData.nickname : "",
            privacy: "Choose",
            location: userData ? userData.user_metadata.location : "",
            timezone: userData ? userData.user_metadata.timezone : "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            console.log(formik);
            return (
              <Form onSubmit={formik.handleSubmit} className="mx-auto">
                <DropzoneProfile formik={formik} />
                <Form.Row>
                  <Form.Group as={Col} controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      autoFocus
                      placeholder="First Name"
                      name="firstName"
                      type="text"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    <FormErrorMessage name="firstName" formik={formik} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      placeholder="Last Name"
                      name="lastName"
                      type="text"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                    />
                    <FormErrorMessage name="lastName" formik={formik} />
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId="email" size="lg">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    disabled
                    name="email"
                    type="email"
                    onClick={() => setServerMessage(null)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  <FormErrorMessage name="email" formik={formik} />
                </Form.Group>

                <Form.Row>
                  <Form.Group as={Col} controlId="handle" size="lg">
                    <Form.Label>Handle</Form.Label>
                    <Form.Control
                      name="handle"
                      type="text"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.handle}
                    />
                    <FormErrorMessage name="handle" formik={formik} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="privacy" size="lg">
                    <Form.Label>Profile Privacy</Form.Label>
                    <Form.Control
                      disabled
                      as="select"
                      name="privacy"
                      type="text"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.privacy}
                    >
                      <option value="">Choose....</option>
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="organisation">Organisation Only</option>
                    </Form.Control>
                    <FormErrorMessage name="privacy" formik={formik} />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="location" size="lg">
                    <Form.Label>Base Location</Form.Label>
                    <Form.Control
                      as="select"
                      name="location"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.location}
                    >
                      <option value="">Choose....</option>
                      <option value="location1">Location1</option>
                      <option value="location2">Location2</option>
                    </Form.Control>
                    <FormErrorMessage name="location" formik={formik} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="timezone" size="lg">
                    <Form.Label>Timezone</Form.Label>
                    <Form.Control
                      as="select"
                      name="timezone"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.timezone}
                    >
                      <option value="">Choose....</option>
                      <option value="UTC +1">UTC +1</option>
                      <option value="UTC +2">UTC +2</option>
                      <option value="UTC +3">UTC +3</option>
                    </Form.Control>

                    <FormErrorMessage name="timezone" formik={formik} />
                  </Form.Group>
                </Form.Row>

                <Button onClick={formik.handleSubmit}>
                  {setup ? "Step 2: Create Organisation" : "Submit"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </fieldset>
    </>
  );
}
