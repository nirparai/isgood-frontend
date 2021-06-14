import React, { useRef } from "react";

import FieldArrayEdit from "./FieldArrayEdit";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import { Form, InputGroup } from "react-bootstrap";
import FieldArrayDelete from "./FieldArrayDelete";

export default function ArrayFieldGroup({
  index,
  formik,
  arrayHelpers,
  value,
  name,
  placeholder,
}) {
  const inputRef = useRef();
  return (
    <>
      <InputGroup>
        <Form.Control
          autoFocus
          placeholder="Demographic"
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

        <Form.Control
          placeholder="Operator"
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

        <Form.Control
          placeholder="Value"
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
      </InputGroup>
    </>
  );
}
