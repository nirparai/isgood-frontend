import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as Yup from "yup";

import { Button, Form } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import ProjectService from "services/projectService";
import ArrayField from "../FieldArrays/ArrayField";
import ArrayInput from "../FieldArrays/ArrayInput";
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
        project.id,
        values.outcomes,
        token
      );
      const res2 = await ProjectService.deleteOutcomes(
        token,
        values.orgId,
        project.id,
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
      <fieldset className="container-fluid p-3 rounded w-100">
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
            return (
              <Form onSubmit={formik.handleSubmit} className="mx-auto">
                <FieldArray name="outcomes">
                  {(arrayHelpers) => {
                    // console.log(formik);
                    // console.log(arrayHelpers);
                    return (
                      <>
                        <ArrayInput
                          arrayHelpers={arrayHelpers}
                          label="Desired Outcomes"
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
                            setdeleteIds={setdeleteIds}
                          />
                        ))}
                        {/* {typeof formik.error.outcomes == "string" ? (
                            <div className="text-danger">
                              {formik.errors.outcomes}
                            </div>
                          ) : null} */}
                      </>
                    );
                  }}
                </FieldArray>
                <div className="d-flex justify-content-center mt-5">
                  <Button type="submit">
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
