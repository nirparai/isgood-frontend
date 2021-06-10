import React, { useRef } from "react";

import FieldArrayEdit from "./FieldArrayEdit";
import FormErrorMessage from "components/FormErrorMessage";
import { Form } from "react-bootstrap";
import FieldArrayDelete from "./FieldArrayDelete";

export default function ArrayFieldPatch({
  index,
  formik,
  arrayHelpers,
  value,
  name,
  placeholder,
  setdeleteIds,
}) {
  const inputRef = useRef();
  return (
    <>
      <div className="d-flex my-2">
        <Form.Control
          name={`${name}[${index}].description`}
          type="text"
          placeholder={placeholder}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={value.description}
          className="disabled"
          ref={inputRef}
        />

        <FieldArrayEdit
          arrayHelpers={arrayHelpers}
          index={index}
          inputRef={inputRef}
        />
        <FieldArrayDelete
          arrayHelpers={arrayHelpers}
          index={index}
          setdeleteIds={setdeleteIds}
        />
      </div>
      <FormErrorMessage name={`${name}[${index}]`} />
    </>
  );
}
