import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { FieldArray } from "formik";
import BenerficiaryGroupChange from "./BenerficiaryGroupChange";
import BenerficiaryGroupDemographics from "./DemographicsModal";
import ModalContainer from "./ModalContainer";
import FormErrorMessage from "../../../components/FormErrorMessage";

export default function BeneficiaryGroups({ arrayHelpers }) {
  const { form, insert, remove } = arrayHelpers;
  return (
    <>
      <Form.Label>Beneficiary Groups</Form.Label>
      {form.values.beneficiaries.map((beneficiary, beneficiaryIndex) => (
        <div
          key={beneficiaryIndex}
          className="d-flex my-2 justify-content-center"
        >
          <div className="w-50 border d-flex align-items-center">
            <div className="mx-2">
              {form.values.beneficiaries[beneficiaryIndex].name}
            </div>
          </div>
          <ModalContainer remove={remove} index={beneficiaryIndex}>
            <>
              <Form.Group controlId={`beneficiaries[${beneficiaryIndex}].name`}>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  autoFocus
                  placeholder=""
                  name={`beneficiaries[${beneficiaryIndex}].name`}
                  type="text"
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  value={form.values.beneficiaries[beneficiaryIndex].name}
                />

                <FormErrorMessage
                  name={`beneficiaries[${beneficiaryIndex}].name`}
                />
              </Form.Group>

              <FieldArray
                name={`beneficiaries[${beneficiaryIndex}].lifeChange`}
              >
                {(changeArrayHelpers) => (
                  <BenerficiaryGroupChange
                    changeArrayHelpers={changeArrayHelpers}
                    beneficiaryIndex={beneficiaryIndex}
                  />
                )}
              </FieldArray>

              <FieldArray
                name={`beneficiaries[${beneficiaryIndex}].demographics`}
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
            insert(form.values.beneficiaries.length, {
              name: "",
              lifeChange: [""],
              demographics: [{ name: "", operator: "", value: "" }],
            })
          }
        >
          + Add Field
        </Button>
      </div>
    </>
  );
}
