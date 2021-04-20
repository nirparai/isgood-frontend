import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { FieldArray } from "formik";
import ModalContainer from "./ModalContainer";

export default function BenerficiaryGroupDemographics({
  beneficiaryIndex,
  demographicArrayHelpers,
}) {
  const [serverMessage, setServerMessage] = useState();
  const { form, insert, remove } = demographicArrayHelpers;
  return (
    <>
      <Form.Label>Demographics</Form.Label>
      {form.values.beneficiaryGroups[beneficiaryIndex].demographics.map(
        (demographic, demographicIndex) => (
          <div
            key={demographicIndex}
            className="d-flex my-2 justify-content-center"
          >
            <div className="w-50 border d-flex align-items-center">
              {
                form.values.beneficiaryGroups[beneficiaryIndex].demographics[
                  demographicIndex
                ].demographic
              }
            </div>
            <ModalContainer remove={remove} index={demographicIndex}>
              <Form.Group
                controlId={`beneficiaryGroups[${beneficiaryIndex}].demographics[${demographicIndex}.demographic]`}
              >
                <Form.Label>Demographic</Form.Label>
                <Form.Control
                  autoFocus
                  placeholder=""
                  name={`beneficiaryGroups[${beneficiaryIndex}].demographics[${demographicIndex}.demographic]`}
                  type="text"
                  onClick={() => setServerMessage(null)}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={
                    form.values.beneficiaryGroups[beneficiaryIndex]
                      .demographics[demographicIndex].demographic
                  }
                />
              </Form.Group>
              <Form.Group
                controlId={`beneficiaryGroups[${beneficiaryIndex}].demographics[${demographicIndex}.operator]`}
              >
                <Form.Label>Operator</Form.Label>
                <Form.Control
                  autoFocus
                  placeholder=""
                  name={`beneficiaryGroups[${beneficiaryIndex}].demographics[${demographicIndex}.operator]`}
                  type="text"
                  onClick={() => setServerMessage(null)}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={
                    form.values.beneficiaryGroups[beneficiaryIndex]
                      .demographics[demographicIndex].operator
                  }
                />
              </Form.Group>
              <Form.Group
                controlId={`beneficiaryGroups[${beneficiaryIndex}].demographics[${demographicIndex}.value]`}
              >
                <Form.Label>Value</Form.Label>
                <Form.Control
                  autoFocus
                  placeholder=""
                  name={`beneficiaryGroups[${beneficiaryIndex}].demographics[${demographicIndex}.value]`}
                  type="text"
                  onClick={() => setServerMessage(null)}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={
                    form.values.beneficiaryGroups[beneficiaryIndex]
                      .demographics[demographicIndex].value
                  }
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
              form.values.beneficiaryGroups[beneficiaryIndex].demographics
                .length,
              { demographic: "", operator: "", value: "" }
            )
          }
        >
          + Add Field
        </Button>
      </div>
    </>
  );
}
