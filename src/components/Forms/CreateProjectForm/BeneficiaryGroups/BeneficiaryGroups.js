// This component maps through all the beneficiary groups and renders
// the required components for editing and adding beneficiary groups

// rendered by CreateProjectForm.js

import React from "react";

import { Form } from "react-bootstrap";
import EditBeneficiaryModalWrapper from "../BeneficiaryGroups/EditBeneficiaryModalWrapper";
import EditBeneficiaryForm from "../BeneficiaryGroups/EditBeneficiaryForm";
import AddBeneficiaryForm from "../BeneficiaryGroups/AddBeneficiaryForm";

export default function BeneficiaryGroups({ arrayHelpers }) {
  const { form: formik, remove } = arrayHelpers;
  return (
    <>
      <Form.Label>Beneficiary Groups</Form.Label>
      <div className="d-flex justify-content-center my-2">
        <AddBeneficiaryForm arrayHelpers={arrayHelpers} />
      </div>
      {formik.values.beneficiaries.map((beneficiary, beneficiaryIndex) => (
        <div
          key={beneficiaryIndex}
          className="d-flex my-2 justify-content-center"
        >
          {/* This div should be a chip displaying the name of the beneficiary */}
          <div className="w-50 border d-flex align-items-center">
            <div className="mx-2">{beneficiary.name}</div>
          </div>
          <EditBeneficiaryModalWrapper
            remove={remove}
            index={beneficiaryIndex}
            formik={formik}
          >
            <EditBeneficiaryForm
              beneficiaryIndex={beneficiaryIndex}
              formik={formik}
              beneficiary={beneficiary}
            />
          </EditBeneficiaryModalWrapper>
        </div>
      ))}
    </>
  );
}
