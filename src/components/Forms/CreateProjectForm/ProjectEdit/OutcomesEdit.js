import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as Yup from "yup";

import { Button, Form } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import ProjectService from "services/projectService";
import "../CreateProjectForm.css";
import ArrayFieldPatch from "../FieldArrays/ArrayFieldPatch";
import ArrayInputPatch from "../ArrayInputPatch";
import UserContext from "context/UserContext";

export default function OutcomesEdit({ project }) {
  const [serverMessage, setServerMessage] = useState();
  const [deleteIds, setdeleteIds] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const { user, setUser } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    outcomes: Yup.array().of(Yup.object()),
    orgId: Yup.string().required(),
  });

  const onSubmit = async (values, methods) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await ProjectService.updateOutcomes(
        token,
        values.orgId,
        project.project_id,
        values.outcomes,
        token
      );
      const res2 = await ProjectService.deleteOutcomes(
        token,
        values.orgId,
        project.project_id,
        deleteIds
      );
      await setUser((state) => {
        const newOutcomes = res2.data;
        const newCurrentProject = state.currentProject;
        newCurrentProject.outcomes = newOutcomes;

        return { ...state, currentProject: newCurrentProject };
      });
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
        <legend className="w-50 bg-light border rounded p-1 text-center">
          Outcomes
        </legend>
        <Formik
          initialValues={{
            orgId: project.org_id,
            outcomes: project.outcomes,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(formik) => {
            console.log(formik);
            return (
              <Form onSubmit={formik.handleSubmit} className="mx-auto">
                <FieldArray name="outcomes">
                  {(arrayHelpers) => {
                    // console.log(formik);
                    // console.log(arrayHelpers);
                    return (
                      <>
                        <ArrayInputPatch
                          arrayHelpers={arrayHelpers}
                          label="Outcomes"
                          placeholder="Input project outcomes here ..."
                        />
                        <Form.Group controlId="outcomes" size="lg">
                          {formik.values.outcomes.map((outcome, index) => (
                            <ArrayFieldPatch
                              name="outcomes"
                              key={index}
                              formik={formik}
                              arrayHelpers={arrayHelpers}
                              index={index}
                              value={outcome}
                              placeholder="Input project outcomes here ..."
                              setdeleteIds={setdeleteIds}
                            />
                          ))}
                          {/* {typeof formik.error.outcomes == "string" ? (
                            <div className="text-danger">
                              {formik.errors.outcomes}
                            </div>
                          ) : null} */}
                        </Form.Group>
                      </>
                    );
                  }}
                </FieldArray>

                <Button block size="lg" type="submit">
                  Save
                </Button>
              </Form>
            );
          }}
        </Formik>
      </fieldset>
    </div>
  );
}
