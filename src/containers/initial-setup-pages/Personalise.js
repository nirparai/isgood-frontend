import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import FormErrorMessage from "../../components/FormErrorMessage";
import HomePageNavbar from "../../components/HomePageNavbar";
import { useAuth0 } from "@auth0/auth0-react";
//Validation code

export default function Personalise() {
  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();
  const { user } = useAuth0();
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string(),
    email: Yup.string().email(),
    description: Yup.string(),
    handle: Yup.string(),
    privacy: Yup.string(),
    location: Yup.string(),
    timezone: Yup.string(),
  });
  console.log(user);
  return (
    <div className="container">
      <HomePageNavbar />
      <div className="d-flex flex-column align-items-center">
        {serverMessage ? (
          <div
            className="alert alert-danger d-flex justify-content-center w-25"
            role="alert"
          >
            {serverMessage}
          </div>
        ) : null}
        <fieldset className="container-fluid border p-3 rounded w-50">
          <legend className="w-50 bg-light border rounded p-1 text-center">
            Personalise Profile
          </legend>
          <Formik
            initialValues={{
              firstName: "Prefilled",
              lastName: "Prefilled",
              email: user.email,
              description: "",
              handle: "",
              privacy: "Choose....",
              location: "Choose....",
              timezone: "Choose....",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
              history.push("/home/myprojects");
            }}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit} className="mx-auto">
                <Form.Row>
                  <Form.Group as={Col} controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      disabled
                      autoFocus
                      placeholder="First Name"
                      name="firstName"
                      type="text"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.firstName}
                    />
                    <FormErrorMessage name="firstName" />
                  </Form.Group>

                  <Form.Group as={Col} controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      disabled
                      placeholder="Last Name"
                      name="lastName"
                      type="text"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.lastName}
                    />
                    <FormErrorMessage name="lastName" />
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
                  <FormErrorMessage name="email" />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Description"
                    name="description"
                    onClick={() => setServerMessage(null)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                  <FormErrorMessage name="description" />
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
                    <FormErrorMessage name="handle" />
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
                      <option>Choose....</option>
                      <option>Public</option>
                      <option>Private</option>
                      <option>Organisation Only</option>
                    </Form.Control>
                    <FormErrorMessage name="privacy" />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="location" size="lg">
                    <Form.Label>Global Region/s</Form.Label>
                    <Form.Control
                      as="select"
                      name="location"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.location}
                    >
                      <option>Choose....</option>
                      <option>Location</option>
                      <option>Location</option>
                    </Form.Control>
                    <FormErrorMessage name="location" />
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
                      <option>Choose....</option>
                      <option>UTC +1</option>
                      <option>UTC +2</option>
                      <option>UTC +3</option>
                    </Form.Control>

                    <FormErrorMessage name="timezone" />
                  </Form.Group>
                </Form.Row>

                <Button block size="lg" type="submit">
                  Step 4: Invite Team Members
                </Button>
              </Form>
            )}
          </Formik>
        </fieldset>
      </div>
    </div>
  );
}
