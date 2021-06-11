import React, { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { Button, Card, Accordion, Form, Col } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import ProjectService from "services/projectService";
import FormErrorMessage from "components/FormErrorMessage";
import UserContext from "context/UserContext";
import BeneficiaryGroups from "./BeneficiaryGroups";
import ArrayField from "./FieldArrays/ArrayField";
import "./CreateProjectForm.css";
import ArrayInput from "./ArrayInput";
import DropzoneLogo from "components/DropzoneLogo";
import DropzoneBanner from "components/DropzoneBanner";

export default function CreateProjectForm({ setup }) {
  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const { user, setUser } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    orgId: Yup.string().required("Required"),
    projectName: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    impacts: Yup.array()
      .of(Yup.string().required("Required"))
      .min(1, "Add at least one impact"),
    outcomes: Yup.array()
      .of(Yup.string().required("Required"))
      .min(1, "Add at least one outcome"),
    beneficiaries: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        lifeChange: Yup.array().of(Yup.string().required("Required")),
        demographics: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required("Required"),
            operator: Yup.string().required("Required"),
            value: Yup.string().required("Required"),
          })
        ),
      })
    ),
    // geolocation: Yup.string(),
    startDate: Yup.string(),
    endDate: Yup.string(),
  });

  const onSubmit = async (values, methods) => {
    try {
      const token = await getAccessTokenSilently();
      console.log(token);
      const res = await ProjectService.createProject(values, token);
      console.log(res);
      if (setup) {
        methods.resetForm();
        // move to next project form page
        history.push("/home/myprojects");
      } else {
        methods.resetForm();
        window.location.reload();
      }
    } catch (err) {
      console.log(err.response.data);
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
        <legend className="w-50 bg-light border rounded p-1 text-center">
          Create Project
        </legend>
        <Formik
          initialValues={{
            orgId: user.currentOrgId,
            projectLogo: null,
            projectName: "",
            description: "",
            impacts: [],
            outcomes: [],
            beneficiaries: [],
            geolocation: [],
            startDate: "",
            endDate: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            console.log(formik);
            return (
              <Form onSubmit={formik.handleSubmit} className="mx-auto">
                {!setup ? (
                  <Form.Group controlId="orgId">
                    <Form.Label>Organisation</Form.Label>
                    <Form.Control
                      as="select"
                      name="orgId"
                      onClick={() => setServerMessage(null)}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.orgId}
                    >
                      <option value={null}>Choose...</option>
                      {user.userOrgs.map((org, index) => {
                        return (
                          <option key={index} value={org.org_id}>
                            {org.name}
                          </option>
                        );
                      })}
                    </Form.Control>
                    <FormErrorMessage name="orgId" />
                  </Form.Group>
                ) : null}

                <DropzoneLogo
                  formik={formik}
                  name="projectLogo"
                  endpoint="project/logo"
                />
                <DropzoneBanner
                  formik={formik}
                  name="projectBanner"
                  endpoint="project/banner"
                />
                <Form.Group controlId="projectName">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    autoFocus
                    placeholder="Project Name"
                    name="projectName"
                    type="text"
                    onClick={() => setServerMessage(null)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.projectName}
                  />
                  <FormErrorMessage name="projectName" />
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Project Description"
                    name="description"
                    onClick={() => setServerMessage(null)}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  />
                  <FormErrorMessage name="description" />
                </Form.Group>

                <FieldArray name="impacts">
                  {(arrayHelpers) => {
                    // console.log(formik);
                    // console.log(arrayHelpers);
                    return (
                      <>
                        <ArrayInput
                          arrayHelpers={arrayHelpers}
                          label="Impacts"
                          placeholder="Input project impacts here ..."
                        />
                        <Form.Group controlId="impacts" size="lg">
                          {formik.values.impacts.map((impact, index) => (
                            <ArrayField
                              name="impacts"
                              key={index}
                              formik={formik}
                              arrayHelpers={arrayHelpers}
                              index={index}
                              value={impact}
                              placeholder="Input project impacts here ..."
                            />
                          ))}
                          {/* {typeof formik.error.impacts == "string" ? (
                            <div className="text-danger">
                              {formik.errors.impacts}
                            </div>
                          ) : null} */}
                        </Form.Group>
                      </>
                    );
                  }}
                </FieldArray>

                <FieldArray name="outcomes">
                  {(arrayHelpers) => {
                    return (
                      <>
                        <ArrayInput
                          arrayHelpers={arrayHelpers}
                          label="Outcomes"
                          placeholder="Input project outcomes here ..."
                        />
                        <Form.Group controlId="outcomes" size="lg">
                          {formik.values.outcomes.map((outcome, index) => (
                            <ArrayField
                              name="outcomes"
                              key={index}
                              formik={formik}
                              arrayHelpers={arrayHelpers}
                              index={index}
                              value={outcome}
                              placeholder="Input project outcomes here ..."
                            />
                          ))}
                        </Form.Group>
                      </>
                    );
                  }}
                </FieldArray>

                <Accordion>
                  <Card className="my-3">
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Advance Fields
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <FieldArray name="beneficiaries">
                          {(arrayHelpers) => (
                            <BeneficiaryGroups arrayHelpers={arrayHelpers} />
                          )}
                        </FieldArray>
                        <Form.Row>
                          <Form.Group controlId="geolocation" size="lg">
                            <div>GeolocationFormField</div>
                          </Form.Group>
                        </Form.Row>
                        <Form.Row>
                          <Form.Group as={Col} controlId="startDate" size="lg">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                              name="startDate"
                              type="date"
                              onClick={() => setServerMessage(null)}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.startDate}
                            />
                            <FormErrorMessage name="startDate" />
                          </Form.Group>

                          <Form.Group as={Col} controlId="endDate" size="lg">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                              name="endDate"
                              type="date"
                              onClick={() => setServerMessage(null)}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.endDate}
                            />
                            <FormErrorMessage name="endDate" />
                          </Form.Group>
                        </Form.Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>

                <Button block size="lg" type="submit">
                  {setup ? "Step 4: Share with Team" : "Submit"}
                </Button>
              </Form>
            );
          }}
        </Formik>
      </fieldset>
    </div>
  );
}
