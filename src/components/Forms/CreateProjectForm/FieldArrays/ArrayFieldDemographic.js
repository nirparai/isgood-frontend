// Specific component made for use with the Demographics FieldArray in CreateProjectForm and BeneficiaryEditForm
// The FieldArray should have the structure of
// [{name: "", operator: "", value: "", id: ""}, {name: "", operator: "", value: "", id: ""}, ...].
// Includes edit and delete buttons

import React, { useRef, useState, useEffect } from "react";

import { Form } from "react-bootstrap";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import FieldArrayDeleteBtn from "./FieldArrayDeleteBtn";
import FieldArrayEditBtn from "./FieldArrayEditBtn";

export default function ArrayFieldDemographic({
  demographicIndex,
  formik,
  arrayHelpers,
  value,
  name,
  placeholder,
  setDeleteDemographicIds,
}) {
  const opt = {
    sex: {
      operator: ["includes", "not includes", "equal", "not equal"],
      values: ["male", "female", "other"],
    },
    age: {
      operator: [">", "<", "=", "!="],
      values: ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
    },
  };

  const options = ["Choose...", "sex", "age"];

  const [isEditing, setIsEditing] = useState(false);
  const [demographic, setDemographic] = useState("");

  let inputRef = useRef();

  useEffect(() => {
    // if (demographic !== "") console.log(opt[demographic].operator);
    console.log(Object.keys(opt).includes(demographic));
  });
  return (
    <>
      <div className="d-flex my-2 justify-content-center">
        {isEditing ? (
          <>
            <Form.Group controlId={`${name}[${demographicIndex}.name]`}>
              <Form.Label>Demographic</Form.Label>
              <Form.Control
                autoFocus
                placeholder={placeholder}
                name={`${name}[${demographicIndex}.name]`}
                as="select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={value.name}
                ref={(input) => {
                  if (input != null) {
                    console.log(input);
                    console.log(input.value);
                    setDemographic(input.value);
                    inputRef.current = input;
                  }
                  inputRef = input;
                }}
              >
                {options.map((option) => {
                  return <option value={option}>{option}</option>;
                })}
              </Form.Control>
              <FormErrorMessage
                name={`${name}[${demographicIndex}.name]`}
                formik={formik}
              />
            </Form.Group>
            <Form.Group controlId={`${name}[${demographicIndex}.operator]`}>
              <Form.Label>Operator</Form.Label>
              <Form.Control
                placeholder={placeholder}
                name={`${name}[${demographicIndex}.operator]`}
                as="select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={value.operator}
              >
                <option value="">Choose ...</option>
                {Object.keys(opt).includes(demographic)
                  ? opt[demographic].operator.map((option) => {
                      return <option value={option}>{option}</option>;
                    })
                  : null}
              </Form.Control>
              <FormErrorMessage
                name={`${name}[${demographicIndex}.operator]`}
                formik={formik}
              />
            </Form.Group>
            <Form.Group controlId={`${name}[${demographicIndex}.value]`}>
              <Form.Label>Value</Form.Label>
              <Form.Control
                placeholder={placeholder}
                name={`${name}[${demographicIndex}.value]`}
                as="select"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={value.value}
              >
                <option value="">Choose ...</option>
                {Object.keys(opt).includes(demographic)
                  ? opt[demographic].values.map((option) => {
                      return <option value={option}>{option}</option>;
                    })
                  : null}
              </Form.Control>

              <FormErrorMessage
                name={`${name}[${demographicIndex}.value]`}
                formik={formik}
              />
            </Form.Group>
          </>
        ) : (
          <div className="border rounded bg-light p-2">
            {value.name + " / " + value.operator + " / " + value.value}
          </div>
        )}

        <FieldArrayEditBtn
          inputRef={inputRef}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
        <FieldArrayDeleteBtn
          arrayHelpers={arrayHelpers}
          index={demographicIndex}
          setdeleteIds={setDeleteDemographicIds}
        />
      </div>
    </>
  );
}
