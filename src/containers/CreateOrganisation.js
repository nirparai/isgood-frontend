import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Grid, Row, Col, FormGroup, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import AuthService from "../services/auth";
import "./CreateOrganisation.css";
import HomePageNavbar from "../components/HomePageNavbar";

//Validation code
const validate = (values) => {
  const errors = {};
  if (!values.organisationName) {
    errors.organisationName = "Required";
  }

  if (!values.description) {
    errors.description = "Required";
  }

  if (!values.handle) {
    errors.handle = "Required";
  }

  if (!values.website) {
    errors.website = "Required";
  }

  if (values.regions === "Choose....") {
    errors.regions = "Required";
  }
  if (values.sector === "Choose....") {
    errors.sector = "Required";
  }
  console.log(errors);
  return errors;
};

export default function CreateOrganisation() {
  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      organisationName: "",
      description: "",
      handle: "",
      website: "",
      regions: "Choose....",
      sector: "Choose....",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      history.push("/personalise");
      window.location.reload();
    },
  });

  return (
    <>
      <HomePageNavbar />
      <div className="createOrg">
        {serverMessage ? (
          <div
            className="alert alert-danger container-fluid errorMessage"
            role="alert"
          >
            {serverMessage}
          </div>
        ) : null}
        <fieldset className="createOrgContainer container-fluid border p-3 rounded">
          <legend className="createOrgLegend border rounded p-1 text-center">
            Create Organisation
          </legend>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group controlId="organisationName">
              <Form.Label>Organisation Name</Form.Label>
              <Form.Control
                autoFocus
                placeholder="Organisation Name"
                name="organisationName"
                type="text"
                onClick={() => setServerMessage(null)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.organisationName}
              />
              {formik.touched.organisationName &&
              formik.errors.organisationName ? (
                <div className="valError">{formik.errors.organisationName}</div>
              ) : null}
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Organisation Description"
                name="description"
                onClick={() => setServerMessage(null)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
              {formik.touched.description && formik.errors.description ? (
                <div className="valError">{formik.errors.description}</div>
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
                  <div className="valError">{formik.errors.handle}</div>
                ) : null}
              </Form.Group>

              <Form.Group as={Col} controlId="website" size="lg">
                <Form.Label>Org Website</Form.Label>
                <Form.Control
                  name="website"
                  type="text"
                  onClick={() => setServerMessage(null)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.website}
                />
                {formik.touched.website && formik.errors.website ? (
                  <div className="valError">{formik.errors.website}</div>
                ) : null}
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="regions" size="lg">
                <Form.Label>Global Region/s</Form.Label>
                <Form.Control
                  as="select"
                  name="regions"
                  onClick={() => setServerMessage(null)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.regions}
                >
                  <option>Choose....</option>
                  <option>Region</option>
                  <option>Region</option>
                </Form.Control>
                {formik.touched.regions && formik.errors.regions ? (
                  <div className="valError">{formik.errors.regions}</div>
                ) : null}
              </Form.Group>

              <Form.Group as={Col} controlId="sector" size="lg">
                <Form.Label>Sector</Form.Label>
                <Form.Control
                  as="select"
                  name="sector"
                  onClick={() => setServerMessage(null)}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.sector}
                >
                  <option>Choose....</option>
                  <option>Sectors</option>
                  <option>Sectors</option>
                </Form.Control>

                {formik.touched.sector && formik.errors.sector ? (
                  <div className="valError">{formik.errors.sector}</div>
                ) : null}
              </Form.Group>
            </Form.Row>

            <Button block size="lg" type="submit">
              Step 2: Create a Project
            </Button>
          </Form>
        </fieldset>
      </div>
    </>
  );
}
