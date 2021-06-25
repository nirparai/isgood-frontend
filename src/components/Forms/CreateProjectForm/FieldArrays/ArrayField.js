// Custom form input field component made for use with Formik FieldArray for any form value
// that has [{description: "", id: ""}, {description: "", id: ""} ... ] structure. Includes edit and delete buttons

// rendered by any component that needs editable FieldArray form inputs

import React, { useRef, useState } from "react";

import FieldArrayEditBtn from "./FieldArrayEditBtn";
import FormErrorMessage from "components/Forms/FormErrorMessage";
import { Form } from "react-bootstrap";
import FieldArrayDeleteBtn from "./FieldArrayDeleteBtn";

export default function ArrayField({
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
      <div className="d-flex my-2 justify-content-center">
        {isEditing ? (
          <Form.Control
            name={`${name}[${index}].description`}
            type="text"
            placeholder={placeholder}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={value.description}
            ref={inputRef}
          />
        ) : (
          <div className="border p-2">{value.description}</div>
        )}
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
      <FormErrorMessage
        name={`${name}[${index}].description`}
        formik={formik}
      />
    </>
  );
}
