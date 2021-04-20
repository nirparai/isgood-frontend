import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
import { FieldArray } from "formik";
import BenerficiaryGroupChange from "./BeneficiaryModal";
import BenerficiaryGroupDemographics from "./DemographicsModal";
import ModalContainer from "./ModalContainer";

export default function BeneficiaryGroups({ arrayHelpers }) {
  const [serverMessage, setServerMessage] = useState();

  const { form, insert, remove } = arrayHelpers;
  return (
    <>
      <Form.Label>Beneficiary Groups</Form.Label>
      {form.values.beneficiaryGroups.map((beneficiary, beneficiaryIndex) => (
        <div
          key={beneficiaryIndex}
          className="d-flex my-2 justify-content-center"
        >
          <div className="w-50 border d-flex align-items-center">
            <div className="mx-2">
              {form.values.beneficiaryGroups[beneficiaryIndex].demoName}
            </div>
          </div>
          <ModalContainer remove={remove} index={beneficiaryIndex}>
            <>
              <Form.Group
                controlId={`beneficiaryGroups[${beneficiaryIndex}].demoName`}
              >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  autoFocus
                  placeholder=""
                  name={`beneficiaryGroups[${beneficiaryIndex}].demoName`}
                  type="text"
                  onClick={() => setServerMessage(null)}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={
                    form.values.beneficiaryGroups[beneficiaryIndex].demoName
                  }
                />
              </Form.Group>

              <FieldArray
                name={`beneficiaryGroups[${beneficiaryIndex}].groupChange`}
              >
                {(changeArrayHelpers) => (
                  <BenerficiaryGroupChange
                    changeArrayHelpers={changeArrayHelpers}
                    beneficiaryIndex={beneficiaryIndex}
                  />
                )}
              </FieldArray>

              <FieldArray
                name={`beneficiaryGroups[${beneficiaryIndex}].demographics`}
              >
                {(demographicArrayHelpers) => (
                  <BenerficiaryGroupDemographics
                    demographicArrayHelpers={demographicArrayHelpers}
                    beneficiaryIndex={beneficiaryIndex}
                  />
                )}
              </FieldArray>
            </>
          </ModalContainer>
        </div>
      ))}
      <div className="d-flex justify-content-center my-2">
        <Button
          onClick={() =>
            insert(form.values.beneficiaryGroups.length, {
              demoName: "",
              groupChange: [""],
              demographics: [{ demographic: "", operator: "", value: "" }],
            })
          }
        >
          + Add Field
        </Button>
      </div>
    </>
  );
}
