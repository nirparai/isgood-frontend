import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import ArrayInputPatch from "../../ArrayInputPatch";
import ArrayFieldPatch from "../../FieldArrays/ArrayFieldPatch";

export default function BeneficiaryGroupChangeEdit({
  beneficiaryIndex,
  changeArrayHelpers,
}) {
  const { form, insert, remove } = changeArrayHelpers;
  return (
    <>
      <ArrayInputPatch
        arrayHelpers={changeArrayHelpers}
        label="How does the life of this beneficiary group change?"
        placeholder="Ex Support & Resources"
      />
      <Form.Group controlId={`beneficiaries[${beneficiaryIndex}].lifeChange`}>
        {form.values.beneficiaries[beneficiaryIndex].lifeChange.map(
          (change, changeIndex) => (
            <ArrayFieldPatch
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
