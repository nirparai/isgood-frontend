import React, { useContext, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import * as Yup from "yup";

import ProjectService from "services/projectService";
import UserContext from "context/UserContext";

import { Button, Form } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import EditBeneficiaryModalWrapper from "../BeneficiaryGroups/EditBeneficiaryModalWrapper";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import ArrayFieldError from "components/Forms/CreateProjectForm/FieldArrays/ArrayFieldError";
import ArrayInput from "../FieldArrays/ArrayInput";
import ArrayField from "../FieldArrays/ArrayField";
import DemographicArrayInput from "../FieldArrays/DemographicArrayInput";
import ArrayFieldDemographic from "../FieldArrays/ArrayFieldDemographic";
import AddBeneficiaryForm from "../BeneficiaryGroups/AddBeneficiaryForm";

export default function BeneficiaryGroupsEdit({
  beneficiaries,
  orgId,
  project,
}) {
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
                id: Yup.string(),
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
              id: Yup.string(),
            })
          )
          .min(1, "Add at least one demographic"),
        id: Yup.string(),
      })
    ),
    orgId: Yup.string().required(),
  });

  const onSubmit = async (values, methods) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await ProjectService.updateBeneficiaryGroup(
        token,
        project.id,
        values.beneficiaries
      );
      // const res2 = await ProjectService.deleteDemographics(
      //   token,
      //   values.orgId,
      //   project.id,
      //   deleteDemographicIds
      // );
      // const res3 = await ProjectService.deleteLifeChange(
      //   token,
      //   values.orgId,
      //   project.id,
      //   deleteLifeChangeIds
      // );
      // await setUser((state) => {
      //   const newImpacts = res2.data;
      //   const newCurrentProject = state.currentProject;
      //   newCurrentProject.outcomes = newImpacts;

      //   return { ...state, currentProject: newCurrentProject };
      // });
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
      <fieldset className="container-fluid p-3 rounded w-100">
        <Formik
          initialValues={{
            orgId: orgId,
            beneficiaries: beneficiaries,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount={true}
          enableReinitialize={true}
        >
          {(formik) => {
            console.log(formik);
            return (
              <Form onSubmit={formik.handleSubmit} className="mx-auto">
                <FieldArray name="beneficiaries">
                  {(arrayHelpers) => {
                    const { form, remove } = arrayHelpers;
                    return (
                      <>
                        <Form.Label>Beneficiary Groups</Form.Label>
                        <div className="d-flex justify-content-center my-2">
                          <AddBeneficiaryForm arrayHelpers={arrayHelpers} />
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
                                project={project}
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
                                              demographicIndex={
                                                demographicIndex
                                              }
                                              beneficiaryIndex={
                                                beneficiaryIndex
                                              }
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
