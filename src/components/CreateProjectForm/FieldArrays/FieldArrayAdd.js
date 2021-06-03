import React from "react";
import { Button } from "react-bootstrap";

export default function FieldArrayAdd({
  formik,
  arrayHelpers,
  fieldValues,
  name,
}) {
  const handleClick = () => {
    fieldValues[0] === ""
      ? formik.setFieldTouched(`${name}[0]`)
      : arrayHelpers.insert(0, "");
  };
  return <Button onClick={handleClick}>+ Add Field</Button>;
}
