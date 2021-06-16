import React, { useState, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import UserContext from "context/UserContext";

import { Col, Button, Form } from "react-bootstrap";
import OrgService from "services/orgService";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import DropzoneLogo from "components/DropzoneLogo";
import DropzoneBanner from "../DropzoneBanner";

export default function CreateOrganisationForm({ setup, orgValues }) {
  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const { setUser } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    organisationName: Yup.string().required("Required"),
    description: Yup.string(),
    handle: Yup.string(),
    url: Yup.string().required("Required"),
    region: Yup.string(),
    sector: Yup.string(),
  });

  const onSubmit = async (values, methods) => {
    try {
      const token = await getAccessTokenSilently();

      const res = await OrgService.createOrg(values, token);
      // This is for keeping track of the orgId as it needs to be submitted in the create project request which is the next page
      // Possibility is using Auth0 to track the last accessed orgId otherwise a more robust UserContext needs to be made that handles this
      console.log(res.data);
      if (setup) {
        setUser((prev) => {
          return { ...prev, currentOrgId: res.data.org_id };
        });
        methods.resetForm();
        history.push("/setup/createproject");
      } else {
        methods.resetForm();
        window.location.reload();
      }
    } catch (err) {
      console.log(err.response);
      if (err.response.data.message) {
        const errMessage = err.response.data.message;
        setServerMessage(errMessage);
      } else {
        setServerMessage("There was a problem please try again later");
      }
    }
  };
  console.log(orgValues);
  return (
    <div className="d-flex flex-column align-items-center">
      {serverMessage ? (
        <div
          className="alert alert-danger d-flex justify-content-center w-25"
          role="alert"
        >
          {serverMessage}
        </div>
      ) : null}
      <fieldset className="container-fluid border p-3 rounded w-100">
        <legend className="w-50 bg-light border rounded p-1 text-center">
          Create Organisation
        </legend>
        <Formik
          initialValues={{
            organisationBanner: null,
            organisationLogo: null,
            organisationName: orgValues.name || "",
            description: orgValues.description || "",
            handle: orgValues.handle || "",
            url: orgValues.url || "",
            region: orgValues.region || "Choose....",
            sector: orgValues.sector || "Choose....",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            console.log(formik);
            return (
              <Form onSubmit={formik.handleSubmit} className="mx-auto">
                <DropzoneLogo
                  formik={formik}
                  name="organisationLogo"
                  endpoint="org/logo"
                />
                <DropzoneBanner
                  formik={formik}
                  name="organisationBanner"
                  endpoint="org/banner"
                />

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

                  <Form.Group as={Col} controlId="url" size="lg">
                    <Form.Label>Org Website</Form.Label>
                    <Form.Control
                      name="url"
                      type="text"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.url}
                    />
                    <FormErrorMessage name="url" />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="region" size="lg">
                    <Form.Label>Global Region/s</Form.Label>
                    <Form.Control
                      as="select"
                      name="region"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.region}
                    >
                      <option value="">Choose....</option>
                      <option value="Region1">Region1</option>
                      <option value="Region2">Region2</option>
                    </Form.Control>
                    <FormErrorMessage name="region" />
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
                  {setup ? "Step 3: Create a Project" : "Submit"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </fieldset>
    </div>
  );
}
//setting default props for if the values arent passed
CreateOrganisationForm.defaultProps = {
  orgValues: {
    name: "",
    description: "",
    handle: "",
    url: "",
    region: "Choose....",
    sector: "Choose....",
  },
};
