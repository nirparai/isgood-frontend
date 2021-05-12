import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import FormErrorMessage from "../../../components/FormErrorMessage";

export default function BenerficiaryGroupChange({
  beneficiaryIndex,
  changeArrayHelpers,
}) {
  const [serverMessage, setServerMessage] = useState();
  const { form, insert, remove } = changeArrayHelpers;
  return (
    <>
      <Form.Group controlId={`beneficiaries[${beneficiaryIndex}].lifeChange`}>
        <Form.Label>
          How does the life of this beneficiary group change?
        </Form.Label>
        {form.values.beneficiaries[beneficiaryIndex].lifeChange.map(
          (change, changeIndex) => (
            <div key={changeIndex}>
              <div className="d-flex flex my-2">
                <Form.Control
                  autoFocus
                  placeholder=""
                  name={`beneficiaries[${beneficiaryIndex}].lifeChange[${changeIndex}]`}
                  type="text"
                  onClick={() => setServerMessage(null)}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={
                    form.values.beneficiaries[beneficiaryIndex].lifeChange[
                      changeIndex
                    ]
                  }
                />
                <Button
                  type="button"
                  onClick={() => remove(changeIndex)} // remove a impact from the list
                  className="mx-1"
                  variant="danger"
                >
                  -
                </Button>
              </div>
              <FormErrorMessage
                name={`beneficiaries[${beneficiaryIndex}].lifeChange[${changeIndex}]`}
              />
            </div>
          )
        )}
        <div className="d-flex justify-content-center my-2">
          <Button
            onClick={() =>
              insert(
                form.values.beneficiaries[beneficiaryIndex].lifeChange.length,
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
