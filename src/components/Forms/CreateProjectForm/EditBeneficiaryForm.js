import React from "react";

import { Form } from "react-bootstrap";
import { FieldArray } from "formik";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import ArrayFieldError from "./FieldArrays/ArrayFieldError";
import ArrayField from "./FieldArrays/ArrayField";
import ArrayInput from "./FieldArrays/ArrayInput";
import DemographicArrayInput from "./FieldArrays/DemographicArrayInput";
import ArrayFieldDemographic from "./FieldArrays/ArrayFieldDemographic";

export default function EditBeneficiaryForm({
  beneficiaryIndex,
  formik,
  beneficiary,
}) {
  return (
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

      <FieldArray name={`beneficiaries[${beneficiaryIndex}].lifeChange`}>
        {(changeArrayHelpers) => (
          <>
            <ArrayInput
              arrayHelpers={changeArrayHelpers}
              label="How does the life of this beneficiary group change?"
              placeholder="Ex Support & Resources"
            />

            {formik.values.beneficiaries[beneficiaryIndex].lifeChange.map(
              (change, changeIndex) => (
                <ArrayField
                  name={`beneficiaries[${beneficiaryIndex}].lifeChange`}
                  key={changeIndex}
                  formik={formik}
                  arrayHelpers={changeArrayHelpers}
                  index={changeIndex}
                  value={change}
                  placeholder="Input change here ..."
                />
              )
            )}
          </>
        )}
      </FieldArray>
      <ArrayFieldError name={`beneficiaries[${beneficiaryIndex}].lifeChange`} />

      <FieldArray name={`beneficiaries[${beneficiaryIndex}].demographics`}>
        {(demographicArrayHelpers) => (
          <>
            <Form.Label>Demographics</Form.Label>
            <DemographicArrayInput
              arrayHelpers={demographicArrayHelpers}
              placeholder="Choose..."
            />
            {formik.values.beneficiaries[beneficiaryIndex].demographics.map(
              (demographic, demographicIndex) => (
                <ArrayFieldDemographic
                  name={`beneficiaries[${beneficiaryIndex}].demographics`}
                  key={demographicIndex}
                  formik={formik}
                  arrayHelpers={demographicArrayHelpers}
                  demographicIndex={demographicIndex}
                  value={demographic}
                  placeholder="Choose ..."
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
  );
}
