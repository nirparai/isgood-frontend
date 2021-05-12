import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import ModalContainer from "./ModalContainer";
import FormErrorMessage from "../../../components/FormErrorMessage";

export default function BenerficiaryGroupDemographics({
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
          <div
            key={demographicIndex}
            className="d-flex my-2 justify-content-center"
          >
            <div className="w-50 border d-flex align-items-center">
              {
                form.values.beneficiaries[beneficiaryIndex].demographics[
                  demographicIndex
                ].name
              }
            </div>
            <ModalContainer remove={remove} index={demographicIndex}>
              <Form.Group
                controlId={`beneficiaries[${beneficiaryIndex}].demographics[${demographicIndex}.name]`}
              >
                <Form.Label>Demographic</Form.Label>
                <Form.Control
                  autoFocus
                  placeholder=""
                  name={`beneficiaries[${beneficiaryIndex}].demographics[${demographicIndex}.name]`}
                  type="text"
                  onClick={() => setServerMessage(null)}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={
                    form.values.beneficiaries[beneficiaryIndex].demographics[
                      demographicIndex
                    ].name
                  }
                />
                <FormErrorMessage
                  name={`beneficiaries[${beneficiaryIndex}].demographics[${demographicIndex}.name]`}
                />
              </Form.Group>
              <Form.Group
                controlId={`beneficiaries[${beneficiaryIndex}].demographics[${demographicIndex}.operator]`}
              >
                <Form.Label>Operator</Form.Label>
                <Form.Control
                  autoFocus
                  placeholder=""
                  name={`beneficiaries[${beneficiaryIndex}].demographics[${demographicIndex}.operator]`}
                  type="text"
                  onClick={() => setServerMessage(null)}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={
                    form.values.beneficiaries[beneficiaryIndex].demographics[
                      demographicIndex
                    ].operator
                  }
                />
                <FormErrorMessage
                  name={`beneficiaries[${beneficiaryIndex}].demographics[${demographicIndex}.operator]`}
                />
              </Form.Group>
              <Form.Group
                controlId={`beneficiaries[${beneficiaryIndex}].demographics[${demographicIndex}.value]`}
              >
                <Form.Label>Value</Form.Label>
                <Form.Control
                  autoFocus
                  placeholder=""
                  name={`beneficiaries[${beneficiaryIndex}].demographics[${demographicIndex}.value]`}
                  type="text"
                  onClick={() => setServerMessage(null)}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={
                    form.values.beneficiaries[beneficiaryIndex].demographics[
                      demographicIndex
                    ].value
                  }
                />
                <FormErrorMessage
                  name={`beneficiaries[${beneficiaryIndex}].demographics[${demographicIndex}.value]`}
                />
              </Form.Group>
            </ModalContainer>
          </div>
        )
      )}
      <div className="d-flex justify-content-center my-2">
        <Button
          onClick={() =>
            insert(
              form.values.beneficiaries[beneficiaryIndex].demographics.length,
              { name: "", operator: "", value: "" }
            )
          }
        >
          + Add Field
        </Button>
      </div>
    </>
  );
}
