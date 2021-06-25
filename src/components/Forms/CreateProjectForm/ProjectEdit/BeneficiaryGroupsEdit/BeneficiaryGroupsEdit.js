import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as Yup from "yup";

import ProjectService from "services/projectService";
import UserContext from "context/UserContext";

import { Button, Form } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import EditBeneficiaryModalWrapper from "../../EditBeneficiaryModalWrapper";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import ArrayFieldError from "components/Forms/CreateProjectForm/FieldArrays/ArrayFieldError";
import ArrayInput from "../../FieldArrays/ArrayInput";
import ArrayField from "../../FieldArrays/ArrayField";
import DemographicArrayInput from "../../FieldArrays/DemographicArrayInput";
import ArrayFieldDemographic from "../../FieldArrays/ArrayFieldDemographic";

export default function BeneficiaryGroupsEdit({ project }) {
  const [serverMessage, setServerMessage] = useState();
  // for storing the Id's of the fields that need to be deleted from the database
  const [deleteBeneficiaryIds, setDeleteBeneficiaryIds] = useState([]);
  const [deleteLifeChangeIds, setDeleteLifeChangeIds] = useState([]);
  const [deleteDemographicIds, setDeleteDemographicIds] = useState([]);

  const { getAccessTokenSilently } = useAuth0();
  const { user, setUser } = useContext(UserContext);

  const validationSchema = Yup.object().shape({
    beneficiaries: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        lifeChange: Yup.array()
          .of(
            Yup.object()
              .shape({
                life_change_id: Yup.string().required("Required"),
                description: Yup.string().required("Required"),
              })
              .required("Required")
          )
          .min(1, "Add at least one change"),
        demographics: Yup.array()
          .of(
            Yup.object().shape({
              name: Yup.string().required("Required"),
              operator: Yup.string().required("Required"),
              value: Yup.string().required("Required"),
              demographic_id: Yup.string().required("Required"),
            })
          )
          .min(1, "Add at least one demographic"),
        beneficairy_id: Yup.string().required(),
      })
    ),
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
      const res2 = await ProjectService.deleteDemographics(
        token,
        values.orgId,
        project.id,
        deleteDemographicIds
      );
      const res3 = await ProjectService.deleteLifeChange(
        token,
        values.orgId,
        project.id,
        deleteLifeChangeIds
      );
      await setUser((state) => {
        const newImpacts = res2.data;
        const newCurrentProject = state.currentProject;
        newCurrentProject.outcomes = newImpacts;

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
  console.log(project);
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
          Impacts
        </legend>
        <Formik
          initialValues={{
            orgId: project.org_id,
            beneficiaries: project.beneficiaries,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            console.log(formik);
            return (
              <Form onSubmit={formik.handleSubmit} className="mx-auto">
                <FieldArray name="beneficiaries">
                  {({ form, insert, remove }) => (
                    <>
                      <Form.Label>Beneficiary Groups</Form.Label>
                      <div className="d-flex justify-content-center my-2">
                        <Button
                          onClick={() =>
                            insert(form.values.beneficiaries.length, {
                              name: "",
                              lifeChange: [],
                              demographics: [],
                            })
                          }
                        >
                          + Add Beneficary Group
                        </Button>
                      </div>
                      {form.values.beneficiaries.map(
                        (beneficiary, beneficiaryIndex) => (
                          <div
                            key={beneficiaryIndex}
                            className="d-flex my-2 justify-content-center"
                          >
                            <div className="w-50 border d-flex align-items-center">
                              <div className="mx-2">
                                {
                                  form.values.beneficiaries[beneficiaryIndex]
                                    .name
                                }
                              </div>
                            </div>
                            <EditBeneficiaryModalWrapper
                              remove={remove}
                              index={beneficiaryIndex}
                              formik={form}
                              field="beneficiaries"
                            >
                              <>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                  autoFocus
                                  placeholder=""
                                  name={`beneficiaries[${beneficiaryIndex}].name`}
                                  type="text"
                                  onChange={form.handleChange}
                                  onBlur={form.handleBlur}
                                  value={beneficiary.name}
                                />

                                <FormErrorMessage
                                  name={`beneficiaries[${beneficiaryIndex}].name`}
                                  formik={formik}
                                />

                                <FieldArray
                                  name={`beneficiaries[${beneficiaryIndex}].lifeChange`}
                                >
                                  {(changeArrayHelpers) => (
                                    <>
                                      <ArrayInput
                                        arrayHelpers={changeArrayHelpers}
                                        label="How does the life of this beneficiary group change?"
                                        placeholder="Ex Support & Resources"
                                      />

                                      {form.values.beneficiaries[
                                        beneficiaryIndex
                                      ].lifeChange.map(
                                        (change, changeIndex) => (
                                          <ArrayField
                                            name={`beneficiaries[${beneficiaryIndex}].lifeChange`}
                                            key={changeIndex}
                                            formik={form}
                                            arrayHelpers={changeArrayHelpers}
                                            index={changeIndex}
                                            value={change}
                                            placeholder="Input change here ..."
                                            setdeleteIds={
                                              setDeleteLifeChangeIds
                                            }
                                          />
                                        )
                                      )}
                                    </>
                                  )}
                                </FieldArray>
                                <ArrayFieldError
                                  name={`beneficiaries[${beneficiaryIndex}].lifeChange`}
                                />
                                <FieldArray
                                  name={`beneficiaries[${beneficiaryIndex}].demographics`}
                                >
                                  {(demographicArrayHelpers) => (
                                    <>
                                      <Form.Label>Demographics</Form.Label>
                                      <DemographicArrayInput
                                        arrayHelpers={demographicArrayHelpers}
                                        placeholder="Choose..."
                                      />
                                      {form.values.beneficiaries[
                                        beneficiaryIndex
                                      ].demographics.map(
                                        (demographic, demographicIndex) => (
                                          <ArrayFieldDemographic
                                            name={`beneficiaries[${beneficiaryIndex}].demographics`}
                                            key={demographicIndex}
                                            formik={form}
                                            arrayHelpers={
                                              demographicArrayHelpers
                                            }
                                            demographicIndex={demographicIndex}
                                            beneficiaryIndex={beneficiaryIndex}
                                            value={demographic}
                                            placeholder="Choose ..."
                                            setDeleteDemographicIds={
                                              setDeleteDemographicIds
                                            }
                                          />
                                        )
                                      )}
                                      <ArrayFieldError
                                        name={`beneficiaries[${beneficiaryIndex}].demographics`}
                                      />
                                    </>
                                  )}
                                </FieldArray>
                              </>
                            </EditBeneficiaryModalWrapper>
                          </div>
                        )
                      )}
                    </>
                  )}
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
