import React from "react";

import Form from "react-bootstrap/Form";
import ArrayInput from "./FieldArrays/ArrayInput";
import ArrayField from "./FieldArrays/ArrayField";

export default function BenerficiaryGroupChange({
  beneficiaryIndex,
  changeArrayHelpers,
}) {
  const { form, insert, remove } = changeArrayHelpers;
  return (
    <>
      <ArrayInput
        arrayHelpers={changeArrayHelpers}
        label="How does the life of this beneficiary group change?"
        placeholder="Ex Support & Resources"
      />
      <Form.Group controlId={`beneficiaries[${beneficiaryIndex}].lifeChange`}>
        <Form.Label></Form.Label>
        {form.values.beneficiaries[beneficiaryIndex].lifeChange.map(
          (change, changeIndex) => (
            <ArrayField
              name={`beneficiaries[${beneficiaryIndex}].lifeChange`}
              key={changeIndex}
              formik={form}
              arrayHelpers={changeArrayHelpers}
              index={changeIndex}
              value={change}
              placeholder="Input change here ..."
            />
          )
        )}
      </Form.Group>
    </>
  );
}
