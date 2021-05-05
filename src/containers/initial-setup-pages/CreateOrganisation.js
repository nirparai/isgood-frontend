import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import { Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import UserService from "../../services/user";
import HomePageNavbar from "../../components/HomePageNavbar";
import * as Yup from "yup";
import FormErrorMessage from "../../components/FormErrorMessage";
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from "../../context/UserContext";

export default function CreateOrganisation() {
  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const { user, setUser } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    organisationName: Yup.string().required("Required"),
    description: Yup.string(),
    handle: Yup.string(),
    website: Yup.string().required("Required"),
    regions: Yup.string(),
    sector: Yup.string(),
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
            Create Organisation
          </legend>
          <Formik
            initialValues={{
              organisationName: "",
              description: "",
              handle: "",
              website: "",
              regions: "Choose....",
              sector: "Choose....",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, methods) => {
              try {
                const token = await getAccessTokenSilently();

                const res = await UserService.createOrg(
                  values.organisationName,
                  values.website,
                  token
                );

                setUser((state) => {
                  return { ...state, currentOrgId: res.data.orgId };
                });
                methods.resetForm();
                history.push("/createproject");
              } catch (err) {
                const errMessage = err.response.data["error"];
                setServerMessage(errMessage);
              }
            }}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit} className="mx-auto">
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
                  <FormErrorMessage name="organisationName" />
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
                    <FormErrorMessage name="website" />
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
                    <FormErrorMessage name="regions" />
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

                    <FormErrorMessage name="sector" />
                  </Form.Group>
                </Form.Row>

                <Button block size="lg" type="submit">
                  Step 2: Create a Project
                </Button>
              </Form>
            )}
          </Formik>
        </fieldset>
      </div>
    </div>
  );
}
