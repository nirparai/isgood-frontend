import React, { useState } from "react";

import { Button, Form } from "react-bootstrap";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import ArrayFieldDemographic from "../../FieldArrays/ArrayFieldDemographic";

export default function BeneficiaryGroupDemographicsEdit({
  beneficiaryIndex,
  demographicArrayHelpers,
}) {
  const [serverMessage, setServerMessage] = useState();
  const { form, insert, remove } = demographicArrayHelpers;
  return (
    <>
      <Form.Label>Demographics</Form.Label>
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
      <div className="d-flex justify-content-center my-2">
        <Button
          onClick={() =>
            insert(
              form.values.beneficiaries[beneficiaryIndex].demographics.length,
              { name: "", operator: "", value: "", id: "" }
            )
          }
        >
          + Add Field
        </Button>
      </div>
    </>
  );
}
