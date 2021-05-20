import React, { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { Button, Card, Accordion, Form, Col } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import HomePageNavbar from "components/HomePageNavbar";
import UserService from "services/user";
import FormErrorMessage from "components/FormErrorMessage";
import UserContext from "context/UserContext";
import BeneficiaryGroups from "./BeneficiaryGroups";

export default function CreateProject() {
  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();
  const { getAccessTokenSilently } = useAuth0();
  const { user, setUser } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    orgId: Yup.string().required(),
    projectName: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    impacts: Yup.array().of(Yup.string().required("Required")),
    outcomes: Yup.array().of(Yup.string().required("Required")),
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
    geolocation: Yup.array().of(Yup.string()),
    startDate: Yup.string(),
    endDate: Yup.string(),
  });

  const onSubmit = async (values, methods) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await UserService.createProject(
        values.orgId,
        values.projectName,
        values.description,
        values.impacts,
        values.outcomes,
        values.beneficiaries,
        token
      );
      console.log(res);

      methods.resetForm();

      // move to next project form page
      history.push("/home/myprojects");
    } catch (err) {
      console.log(err.response.data);
      if (err.response.data["error"]) {
        const errMessage = err.response.data["error"];
        setServerMessage(errMessage);
      } else {
        setServerMessage("There was a problem please try again later");
      }
    }
  };

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
            Create Project
          </legend>
          <Formik
            initialValues={{
              orgId: user.currentOrgId,
              projectName: "",
              description: "",
              impacts: [""],
              outcomes: [""],
              beneficiaries: [],
              geolocation: ["", ""],
              startDate: "",
              endDate: "",
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => (
              <Form onSubmit={formik.handleSubmit} className="mx-auto">
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
                      <Form.Group controlId="impacts" size="lg">
                        <Form.Label>Impacts</Form.Label>
                        {formik.values.impacts.map((impact, index) => (
                          <div key={index}>
                            <div className="d-flex my-2">
                              <Form.Control
                                name={`impacts[${index}]`}
                                type="text"
                                placeholder="Impact"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={impact}
                              />
                              <Button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} // remove a impact from the list
                                className="mx-1"
                                variant="danger"
                              >
                                -
                              </Button>
                            </div>
                            <FormErrorMessage name={`impacts[${index}]`} />
                          </div>
                        ))}
                        <div className="d-flex justify-content-center my-2">
                          <Button
                            onClick={() =>
                              arrayHelpers.insert(
                                arrayHelpers.form.values.impacts.length,
                                ""
                              )
                            }
                          >
                            + Add Field
                          </Button>
                        </div>
                      </Form.Group>
                    );
                  }}
                </FieldArray>

                <FieldArray name="outcomes">
                  {(arrayHelpers) => {
                    return (
                      <Form.Group controlId="outcomes" size="lg">
                        <Form.Label>Outcomes</Form.Label>
                        {formik.values.outcomes.map((outcome, index) => (
                          <div key={index}>
                            <div className="d-flex my-2">
                              <Form.Control
                                name={`outcomes[${index}]`}
                                type="text"
                                placeholder="Outcome"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={outcome}
                              />
                              <Button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} // remove a impact from the list
                                className="mx-1"
                                variant="danger"
                              >
                                -
                              </Button>
                            </div>
                            <FormErrorMessage name={`outcomes[${index}]`} />
                          </div>
                        ))}
                        <div className="d-flex justify-content-center my-2">
                          <Button
                            onClick={() =>
                              arrayHelpers.insert(
                                arrayHelpers.form.values.outcomes.length,
                                ""
                              )
                            }
                          >
                            + Add Field
                          </Button>
                        </div>
                      </Form.Group>
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
                  Next
                </Button>
              </Form>
            )}
          </Formik>
        </fieldset>
      </div>
    </div>
  );
}
