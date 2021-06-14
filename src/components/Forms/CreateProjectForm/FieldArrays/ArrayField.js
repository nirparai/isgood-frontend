import React, { useRef } from "react";

import FieldArrayEdit from "./FieldArrayEdit";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import { Form } from "react-bootstrap";
import FieldArrayDelete from "./FieldArrayDelete";

export default function ArrayField({
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
      <div className="d-flex my-2">
        <Form.Control
          name={`${name}[${index}]`}
          type="text"
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={value}
          className="disabled"
          ref={inputRef}
        />

        <FieldArrayEdit
          arrayHelpers={arrayHelpers}
          index={index}
          inputRef={inputRef}
        />
        <FieldArrayDelete arrayHelpers={arrayHelpers} index={index} />
      </div>
      <FormErrorMessage name={`${name}[${index}]`} />
    </>
  );
}
