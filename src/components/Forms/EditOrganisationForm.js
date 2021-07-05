import React, { useState, useContext } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from "context/UserContext";

import { Col, Button, Form } from "react-bootstrap";
import OrgService from "services/orgService";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import DropzoneLogo from "components/DropzoneLogo";
import DropzoneBanner from "../DropzoneBanner";
import userService from "services/userService";

export default function EditOrganisationForm({orgValues }) {  
  const [serverMessage, setServerMessage] = useState();
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
      const orgRes = await OrgService.editOrg(values, token, orgValues.id);
      await setUser((state) => {
        console.log(state);
        //map the userOrgs & find the orgId
        //update the org with response data from API  
        state.userOrgs.map((orgs, index)=>{
          if(orgs.id === orgValues.id){
            state.userOrgs[index] = orgRes.data;
          }
        })
        return { ...state };
      });     

      const userRes = await userService.updateLastOrg(orgRes.data.id, token);
      console.log(userRes);
      await setUser((prev) => ({ ...prev, userData: userRes.data }));      
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
        <Formik
          initialValues={{
            organisationBanner: orgValues.banner?orgValues.banner.location:"",
            organisationLogo: orgValues.logo?orgValues.logo.location:"",
            organisationName: orgValues.name,
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
                  <FormErrorMessage name="organisationName" formik={formik} />
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
                  <FormErrorMessage name="description" formik={formik} />
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
                    <FormErrorMessage name="url" formik={formik} />
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
                    <FormErrorMessage name="region" formik={formik} />
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

                    <FormErrorMessage name="sector" formik={formik} />
                  </Form.Group>
                </Form.Row>

                <div className="d-flex justify-content-center mt-5">
                  <Button type="submit" align="center">
                    Save
                  </Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </fieldset>
    </div>
  );
}
//setting default props for if the values arent passed
EditOrganisationForm.defaultProps = {
  orgValues: {
    name: "",
    description: "",
    handle: "",
    url: "",
    region: "Choose....",
    sector: "Choose....",
  },
};
