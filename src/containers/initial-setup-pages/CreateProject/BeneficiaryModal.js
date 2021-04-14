import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { FieldArray } from "formik";

export default function BenerficiaryGroupChange({
  beneficiaryIndex,
  changeArrayHelpers,
}) {
  const [serverMessage, setServerMessage] = useState();
  const { form, insert } = changeArrayHelpers;
  return (
    <>
      <Form.Group
        controlId={`beneficiaryGroups[${beneficiaryIndex}].groupChange`}
      >
        <Form.Label>
          How does the life of this beneficiary group change?
        </Form.Label>
        {form.values.beneficiaryGroups[beneficiaryIndex].groupChange.map(
          (change, changeIndex) => (
            <div key={changeIndex} className="d-flex flex-column my-2">
              <Form.Control
                autoFocus
                placeholder=""
                name={`beneficiaryGroups[${beneficiaryIndex}].groupChange[${changeIndex}]`}
                type="text"
                onClick={() => setServerMessage(null)}
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={
                  form.values.beneficiaryGroups[beneficiaryIndex].groupChange[
                    changeIndex
                  ]
                }
              />
            </div>
          )
        )}
        <div className="d-flex justify-content-center my-2">
          <Button
            onClick={() =>
              insert(
                form.values.beneficiaryGroups[beneficiaryIndex].groupChange
                  .length,
                ""
              )
            }
          >
            + Add Field
          </Button>
        </div>
      </Form.Group>
    </>
  );
}
