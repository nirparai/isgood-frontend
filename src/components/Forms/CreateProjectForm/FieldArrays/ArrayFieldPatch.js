import React, { useRef, useState } from "react";

import FieldArrayEditBtn from "./FieldArrayEditBtn";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import { Form } from "react-bootstrap";
import FieldArrayDeleteBtn from "./FieldArrayDeleteBtn";

export default function ArrayFieldPatch({
  index,
  formik,
  arrayHelpers,
  value,
  name,
  placeholder,
  setdeleteIds,
}) {
  const [isEditing, setIsEditing] = useState(false);
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

        <FieldArrayEditBtn
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          inputRef={inputRef}
        />
        <FieldArrayDeleteBtn
          arrayHelpers={arrayHelpers}
          index={index}
          setdeleteIds={setdeleteIds}
        />
      </div>
      <FormErrorMessage name={`${name}[${index}]`} />
    </>
  );
}
