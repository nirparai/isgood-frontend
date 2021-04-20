import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Formik, FieldArray } from "formik";
import HomePageNavbar from "../../../components/HomePageNavbar";
import AuthService from "../../../services/auth";
import BeneficiaryGroups from "./BeneficiaryGroups";

//Validation code
const validate = (values) => {
  const errors = {};
  return errors;
};

export default function CreateProject2() {
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
        <fieldset className="container-fluid border p-3 rounded w-75">
          <legend className="w-50 bg-light border rounded p-1 text-center">
            Create Project: 2
          </legend>
          <Formik
            initialValues={{
              beneficiaryGroups: [
                {
                  demoName: "",
                  groupChange: [""],
                  demographics: [{ demographic: "", operator: "", value: "" }],
                },
              ],
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
                <FieldArray name="beneficiaryGroups">
                  {(arrayHelpers) => (
                    <BeneficiaryGroups arrayHelpers={arrayHelpers} />
                  )}
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
