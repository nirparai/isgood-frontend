import React from "react";
import { Field, getIn } from "formik";

function ArrayFieldError({ name }) {
  return (
    <>
      <Field name={name}>
        {({ form }) => {
          const error = getIn(form.errors, name);
          const touch = getIn(form.touched, name);
          return touch && error && typeof error === "string" ? (
            <div className="text-danger">{error}</div>
          ) : null;
        }}
      </Field>
    </>
  );
}

export default ArrayFieldError;
