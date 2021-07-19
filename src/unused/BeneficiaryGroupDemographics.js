import React, { useState } from "react";

import { Button, Form } from "react-bootstrap";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import DemographicArrayInput from "./FieldArrays/DemographicArrayInput";
import ArrayFieldDemographic from "./FieldArrays/ArrayFieldDemographic";
import ArrayFieldError from "./FieldArrays/ArrayFieldError";

export default function BeneficiaryGroupDemographics({
  beneficiaryIndex,
  demographicArrayHelpers,
}) {
  const { form: formik } = demographicArrayHelpers;
  return (
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
            beneficiaryIndex={beneficiaryIndex}
            value={demographic}
            placeholder="Choose ..."
          />
        )
      )}
      <ArrayFieldError
        name={`beneficiaries[${beneficiaryIndex}].demographics`}
      />
    </>
  );
}
