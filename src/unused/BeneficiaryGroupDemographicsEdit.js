import ArrayFieldError from "components/Forms/CreateProjectForm/FieldArrays/ArrayFieldError";
import React from "react";

import { Button, Form } from "react-bootstrap";
import ArrayFieldDemographic from "../../FieldArrays/ArrayFieldDemographic";
import DemographicArrayInput from "../../FieldArrays/DemographicArrayInput";
export default function BeneficiaryGroupDemographicsEdit({
  beneficiaryIndex,
  demographicArrayHelpers,
  setDeleteDemographicIds,
}) {
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
            setDeleteDemographicIds={setDeleteDemographicIds}
          />
        )
      )}
      <ArrayFieldError
        name={`beneficiaries[${beneficiaryIndex}].demographics`}
      />
    </>
  );
}
