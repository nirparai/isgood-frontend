import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Formik, FieldArray } from "formik";
import HomePageNavbar from "../../../components/HomePageNavbar";
import AuthService from "../../../services/auth";

//Validation code
const validate = (values) => {
  const errors = {};
  // if (!values.projectName) {
  //   errors.projectName = "Required";
  // }
  // if (!values.description) {
  //   errors.description = "Required";
  // }
  // if (!values.impacts) {
  //   errors.impacts = "Required";
  // }
  // if (!values.outcomes) {
  //   errors.outcomes = "Required";
  // }

  return errors;
};

export default function CreateProject() {
  const [serverMessage, setServerMessage] = useState();
  const history = useHistory();

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
              projectName: "",
              description: "",
              impacts: [""],
              outcomes: [""],
            }}
            onSubmit={(values, methods) => {
              console.log(methods);
              alert(JSON.stringify(values, null, 2));
              methods.resetForm();

              // move to next project form page

              history.push("/personalise");
              window.location.reload();
            }}
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
                  {formik.touched.projectName && formik.errors.projectName ? (
                    <div className="text-danger">
                      {formik.errors.projectName}
                    </div>
                  ) : null}
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
                  {formik.touched.description && formik.errors.description ? (
                    <div className="text-danger">
                      {formik.errors.description}
                    </div>
                  ) : null}
                </Form.Group>

                <FieldArray name="impacts">
                  {(arrayHelpers) => {
                    // console.log(formik);
                    // console.log(arrayHelpers);
                    return (
                      <Form.Group controlId="impacts" size="lg">
                        <Form.Label>Impacts</Form.Label>
                        {formik.values.impacts.map((impact, index) => (
                          <div key={index} className="d-flex my-2">
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
                          <div key={index} className="d-flex my-2">
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
