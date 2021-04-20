import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import HomePageNavbar from "../../components/HomePageNavbar";

//Validation code
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  }

  if (!values.description) {
    errors.description = "Required";
  }

  if (!values.handle) {
    errors.handle = "Required";
  }
  if (values.privacy === "Choose....") {
    errors.privacy = "Required";
  }
  if (values.location === "Choose....") {
    errors.location = "Required";
  }
  if (values.timezone === "Choose....") {
    errors.timezone = "Required";
  }

  return errors;
};

export default function Personalise() {
  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      firstName: "Prefilled",
      lastName: "Prefilled",
      email: "Prefilled@email.com",
      description: "",
      handle: "",
      privacy: "Choose....",
      location: "Choose....",
      timezone: "Choose....",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      history.push("/projectprofilescreen");
      window.location.reload();
    },
  });

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
          <Form onSubmit={formik.handleSubmit} className="mx-auto">
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
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-danger">{formik.errors.firstName}</div>
                ) : null}
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
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-danger">{formik.errors.lastName}</div>
                ) : null}
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="email" size="lg">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                onClick={() => setServerMessage(null)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-danger">{formik.errors.email}</div>
              ) : null}
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
              {formik.touched.description && formik.errors.description ? (
                <div className="text-danger">{formik.errors.description}</div>
              ) : null}
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
                {formik.touched.handle && formik.errors.handle ? (
                  <div className="text-danger">{formik.errors.handle}</div>
                ) : null}
              </Form.Group>

              <Form.Group as={Col} controlId="privacy" size="lg">
                <Form.Label>Profile Privacy</Form.Label>
                <Form.Control
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
                {formik.touched.privacy && formik.errors.privacy ? (
                  <div className="text-danger">{formik.errors.privacy}</div>
                ) : null}
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
                {formik.touched.location && formik.errors.location ? (
                  <div className="text-danger">{formik.errors.location}</div>
                ) : null}
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

                {formik.touched.timezone && formik.errors.timezone ? (
                  <div className="text-danger">{formik.errors.timezone}</div>
                ) : null}
              </Form.Group>
            </Form.Row>

            <Button block size="lg" type="submit">
              Step 4: Invite Team Members
            </Button>
          </Form>
        </fieldset>
      </div>
    </div>
  );
}
