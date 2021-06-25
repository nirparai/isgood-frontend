// Component for showing the error of any field from Formik

import React from "react";
import { Field, getIn } from "formik";

function FormErrorMessage({ name, formik }) {
  return (
    <>
      <Field name={name}>
        {() => {
          const error = getIn(formik.errors, name);
          const touch = getIn(formik.touched, name);
          return touch && error ? (
            <div className="text-danger">{error}</div>
          ) : null;
        }}
      </Field>
    </>
  );
}

export default FormErrorMessage;
