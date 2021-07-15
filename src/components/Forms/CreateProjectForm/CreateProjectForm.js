import React, { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { Button, Card, Accordion, Form, Col } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import ProjectService from "services/projectService";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import UserContext from "context/UserContext";
import BeneficiaryGroups from "./BeneficiaryGroups/BeneficiaryGroups";
import ArrayField from "./FieldArrays/ArrayField";
import ArrayInput from "./FieldArrays/ArrayInput";
import DropzoneLogo from "components/DropzoneLogo";
import DropzoneBanner from "components/DropzoneBanner";
import ArrayFieldError from "./FieldArrays/ArrayFieldError";
import GeolocationFormField from "components/GeolocationFormField";

export default function CreateProjectForm({ setup, orgId }) {
  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const { user, setUser } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    orgId: Yup.string().required("Required"),
    projectName: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    impacts: Yup.array()
      .of(
        Yup.object().shape({
          description: Yup.string().required("Required"),
          id: Yup.string(),
        })
      )
      .min(1, "Add at least one impact"),
    outcomes: Yup.array()
      .of(
        Yup.object().shape({
          description: Yup.string().required("Required"),
          id: Yup.string(),
        })
      )
      .min(1, "Add at least one outcome"),
    beneficiaries: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        lifeChange: Yup.array()
          .of(
            Yup.object().shape({
              description: Yup.string().required("Required"),
              id: Yup.string(),
            })
          )
          .min(1, "Add at least one change"),
        demographics: Yup.array()
          .of(
            Yup.object().shape({
              name: Yup.string().required("Required"),
              operator: Yup.string().required("Required"),
              value: Yup.string().required("Required"),
              id: Yup.string(),
            })
          )
          .min(1, "Add at least one demographic"),
      })
    ),
    geolocation: Yup.object().shape({
      coordinates: Yup.array()
        .of(Yup.string())
        .length(2, "Only two values expected"),
      location: Yup.string(),
    }),
    startDate: Yup.string(),
    endDate: Yup.string(),
  });

  const onSubmit = async (values, methods) => {
    try {
      const token = await getAccessTokenSilently();
      const projectRes = await ProjectService.createProject(values, token);
      await setUser((state) => {
        const newUserProjects = state.userOrgs;
        newUserProjects.push(projectRes.data);
        return { ...state, userProjects: newUserProjects };
      });
      if (setup) {
        methods.resetForm();
        // move to next project form page
        history.push(`/home/myprojects/${projectRes.data.id}`);
      } else {
        methods.resetForm();
        // window.location.reload();
        history.push(`/home/myprojects/${projectRes.data.id}`);
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
            orgId: user.userData.user_metadata.lastOrg,
            projectLogo: null,
            projectBanner: null,
            projectName: "",
            description: "",
            impacts: [],
            outcomes: [],
            beneficiaries: [],
            geolocation: {},
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
                          <option key={index} value={org.id}>
                            {org.name}
                          </option>
                        );
                      })}
                    </Form.Control>
                    <FormErrorMessage name="orgId" formik={formik} />
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
                  <FormErrorMessage name="projectName" formik={formik} />
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
                  <FormErrorMessage name="description" formik={formik} />
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

                        <ArrayFieldError name="impacts" />
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

                        <ArrayFieldError name="outcomes" />
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
                          <Form.Group
                            controlId="geolocation"
                            size="lg"
                            className="w-100"
                          >
                            <Form.Label>Geolocation</Form.Label>
                            <GeolocationFormField
                              formik={formik}
                              name="geolocation"
                              placeholder="Input location query here"
                              className="w-100"
                            />
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
                            <FormErrorMessage
                              name="startDate"
                              formik={formik}
                            />
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
                            <FormErrorMessage name="endDate" formik={formik} />
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
