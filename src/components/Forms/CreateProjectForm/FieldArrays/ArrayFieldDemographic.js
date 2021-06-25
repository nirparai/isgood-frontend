import React, { useRef, useState } from "react";

import { Form } from "react-bootstrap";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import FieldArrayDeleteBtn from "./FieldArrayDeleteBtn";
import FieldArrayEditBtn from "./FieldArrayEditBtn";

export default function ArrayFieldDemographic({
  demographicIndex,
  beneficiaryIndex,
  formik,
  arrayHelpers,
  value,
  name,
  placeholder,
  setDeleteDemographicIds,
}) {
  const inputRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
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
                ref={inputRef}
              >
                <option value="">Choose...</option>
                <option value="gender">Gender</option>
                <option value="age">Age</option>
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
                <option value="">Choose...</option>
                <option> &lt;</option>
                <option> &gt;</option>
                <option>=</option>
                <option>!=</option>
                <option>equal to</option>
                <option>greater than</option>
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
                <option value="">Choose...</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>18 to 25</option>
                <option>25 to 40</option>
                <option>65</option>
                <option>10</option>
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
