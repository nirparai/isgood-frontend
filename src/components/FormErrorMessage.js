import React from "react";
import { Field, getIn } from "formik";

function FormErrorMessage({ name }) {
  return (
    <>
      <Field name={name}>
        {({ form }) => {
          const error = getIn(form.errors, name);
          const touch = getIn(form.touched, name);
          return touch && error ? (
            <div className="text-danger">{error}</div>
          ) : null;
        }}
      </Field>
    </>
  );
}

export default FormErrorMessage;
