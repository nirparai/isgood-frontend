import React from "react";

import { Button, Form } from "react-bootstrap";
import { FieldArray } from "formik";
import BenerficiaryGroupChange from "./BeneficiaryGroupChange";
import BenerficiaryGroupDemographics from "./BeneficiaryGroupDemographics";
import EditBeneficiaryModalWrapper from "./EditBeneficiaryModalWrapper";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import ArrayFieldError from "./FieldArrays/ArrayFieldError";

export default function BeneficiaryGroups({ arrayHelpers }) {
  const { form: formik, insert, remove } = arrayHelpers;
  return (
    <>
      <Form.Label>Beneficiary Groups</Form.Label>
      <div className="d-flex justify-content-center my-2">
        <Button
          onClick={() =>
            insert(formik.values.beneficiaries.length, {
              name: "",
              lifeChange: [],
              demographics: [],
            })
          }
        >
          + Add Beneficary Group
        </Button>
      </div>
      {formik.values.beneficiaries.map((beneficiary, beneficiaryIndex) => (
        <div
          key={beneficiaryIndex}
          className="d-flex my-2 justify-content-center"
        >
          <div className="w-50 border d-flex align-items-center">
            <div className="mx-2">{beneficiary.name}</div>
          </div>
          <EditBeneficiaryModalWrapper
            remove={remove}
            index={beneficiaryIndex}
            formik={formik}
          >
            <>
              <Form.Group controlId={`beneficiaries[${beneficiaryIndex}].name`}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  autoFocus
                  placeholder=""
                  name={`beneficiaries[${beneficiaryIndex}].name`}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={beneficiary.name}
                />

                <FormErrorMessage
                  name={`beneficiaries[${beneficiaryIndex}].name`}
                  formik={formik}
                />
              </Form.Group>

              <FieldArray
                name={`beneficiaries[${beneficiaryIndex}].lifeChange`}
              >
                {(changeArrayHelpers) => (
                  <BenerficiaryGroupChange
                    changeArrayHelpers={changeArrayHelpers}
                    beneficiaryIndex={beneficiaryIndex}
                  />
                )}
              </FieldArray>
              <ArrayFieldError
                name={`beneficiaries[${beneficiaryIndex}].lifeChange`}
              />

              <FieldArray
                name={`beneficiaries[${beneficiaryIndex}].demographics`}
              >
                {(demographicArrayHelpers) => (
                  <BenerficiaryGroupDemographics
                    demographicArrayHelpers={demographicArrayHelpers}
                    beneficiaryIndex={beneficiaryIndex}
                  />
                )}
              </FieldArray>
            </>
          </EditBeneficiaryModalWrapper>
        </div>
      ))}
    </>
  );
}
