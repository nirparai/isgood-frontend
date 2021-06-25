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
  const [serverMessage, setServerMessage] = useState();
  const { form, insert, remove } = demographicArrayHelpers;
  return (
    <>
      <Form.Label>Demographics</Form.Label>
      <DemographicArrayInput
        arrayHelpers={demographicArrayHelpers}
        placeholder="Choose..."
      />
      {form.values.beneficiaries[beneficiaryIndex].demographics.map(
        (demographic, demographicIndex) => (
          <ArrayFieldDemographic
            name={`beneficiaries[${beneficiaryIndex}].demographics`}
            key={demographicIndex}
            formik={form}
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
