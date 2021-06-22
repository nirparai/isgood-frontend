import React, { useRef } from "react";

import { Form } from "react-bootstrap";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import FieldArrayDelete from "./FieldArrayDelete";
import FieldArrayEdit from "./FieldArrayEdit";

export default function ArrayFieldDemographic({
  demographicIndex,
  beneficiaryIndex,
  formik,
  arrayHelpers,
  value,
  name,
  placeholder,
}) {
  const inputRef = useRef();
  return (
    <>
      <div className="d-flex my-2 justify-content-center">
        <Form.Group
          controlId={`beneficiaries[${beneficiaryIndex}].demographics[${demographicIndex}.name]`}
        >
          <Form.Label>Demographic</Form.Label>
          <Form.Control
            autoFocus
            placeholder=""
            name={`beneficiaries[${beneficiaryIndex}].demographics[${demographicIndex}.name]`}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={
              formik.values.beneficiaries[beneficiaryIndex].demographics[
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
            placeholder=""
            name={`beneficiaries[${beneficiaryIndex}].demographics[${demographicIndex}.operator]`}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={
              formik.values.beneficiaries[beneficiaryIndex].demographics[
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
            placeholder=""
            name={`beneficiaries[${beneficiaryIndex}].demographics[${demographicIndex}.value]`}
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={
              formik.values.beneficiaries[beneficiaryIndex].demographics[
                demographicIndex
              ].value
            }
          />
          <FormErrorMessage
            name={`beneficiaries[${beneficiaryIndex}].demographics[${demographicIndex}.value]`}
          />
        </Form.Group>
      </div>
    </>
  );
}
