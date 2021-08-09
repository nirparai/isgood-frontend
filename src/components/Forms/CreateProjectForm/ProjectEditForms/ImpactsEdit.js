import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as Yup from "yup";

import { Button, Form } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import ProjectService from "services/projectService";
import ArrayField from "../FieldArrays/ArrayField";
import ArrayInput from "../FieldArrays/ArrayInput";
import UserContext from "context/UserContext";

export default function ImpactsEdit({ project }) {
  const [serverMessage, setServerMessage] = useState();
  const [deleteIds, setdeleteIds] = useState([]);
  const { getAccessTokenSilently } = useAuth0();
  const { setUser } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    impacts: Yup.array().of(Yup.object()),
    orgId: Yup.string().required(),
  });

  const onSubmit = async (values, methods) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await ProjectService.updateImpacts(
        token,
        values.orgId,
        project.id,
        values.impacts,
        token
      );
      const res2 = await ProjectService.deleteImpacts(
        token,
        values.orgId,
        project.id,
        deleteIds
      );
      await setUser((state) => {
        const newImpacts = res2.data;
        const newCurrentProject = state.currentProject;
        newCurrentProject.impacts = newImpacts;

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
            impacts: project.impacts,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(formik) => {
            // console.log(formik);
            return (
              <Form onSubmit={formik.handleSubmit} className="mx-auto">
                <FieldArray name="impacts">
                  {(arrayHelpers) => {
                    // console.log(formik);
                    // console.log(arrayHelpers);
                    return (
                      <>
                        <ArrayInput
                          arrayHelpers={arrayHelpers}
                          label="Project Impacts"
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
                            setdeleteIds={setdeleteIds}
                          />
                        ))}
                        {/* {typeof formik.error.impacts == "string" ? (
                            <div className="text-danger">
                              {formik.errors.impacts}
                            </div>
                          ) : null} */}
                      </>
                    );
                  }}
                </FieldArray>
                <div className="d-flex justify-content-center mt-5">
                  <Button type="submit">Save</Button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </fieldset>
    </div>
  );
}
