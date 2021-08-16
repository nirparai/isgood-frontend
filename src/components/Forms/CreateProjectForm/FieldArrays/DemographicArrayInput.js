// Specific set of Form inputs for adding values to a Demographics FieldArray
// used in CreateProjectForm and BeneficiaryEditForm

import React, { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormErrorMessage from "components/Forms/FormErrorMessage";

export default function DemographicArrayInput({ arrayHelpers, placeholder }) {
  const opt = {
    sex: {
      operator: ["includes", "not includes", "equal", "not equal"],
      values: ["male", "female", "other"],
    },
    age: {
      operator: [">", "<", "=", "!="],
      values: ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
    },
  };

  const options = ["Choose...", "sex", "age"];

  const formik = useFormik({
    initialValues: {
      name: "",
      operator: "",
      value: "",
      id: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Required"),
      operator: Yup.string().required("Required"),
      value: Yup.string().required("Required"),
      id: Yup.string(),
    }),
    onSubmit: (values, methods) => {
      // insert values into the field array
      console.log(values);
      arrayHelpers.insert(0, {
        name: values.name,
        operator: values.operator,
        value: values.value,
        id: "",
      });
      methods.resetForm();
    },
  });
  useEffect(() => {
    // console.log(formik.values);
  });

  const handleClick = () => {
    formik.submitForm();
  };
  const handleBlur = () => {
    formik.setTouched({
      id: false,
      name: false,
      operator: false,
      value: false,
    });
  };

  return (
    <div className="d-flex mx-2">
      <Form.Group className="w-25">
        <Form.Label>Demographic</Form.Label>
        <Form.Control
          placeholder={placeholder}
          options={options}
          name="name"
          as="select"
          onBlur={formik.handleBlur}
          value={formik.values.name}
          onChange={formik.handleChange}
        >
          {options.map((option) => {
            return <option value={option}>{option}</option>;
          })}
        </Form.Control>
        <FormErrorMessage name="name" formik={formik} />
      </Form.Group>
      <Form.Group className="w-25">
        <Form.Label>Operator</Form.Label>
        <Form.Control
          placeholder={placeholder}
          name="operator"
          as="select"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.operator}
        >
          <option value="">Choose ...</option>
          {opt[formik.values.name]
            ? opt[formik.values.name].operator.map((opt) => {
                return <option value={opt}>{opt}</option>;
              })
            : null}
        </Form.Control>
        <FormErrorMessage name="operator" formik={formik} />
      </Form.Group>
      <Form.Group className="w-25">
        <Form.Label>Value</Form.Label>
        <Form.Control
          placeholder={placeholder}
          name="value"
          as="select"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.value}
        >
          <option value="">Choose ...</option>
          {opt[formik.values.name]
            ? opt[formik.values.name].values.map((value) => {
                return <option value={value}>{value}</option>;
              })
            : null}
        </Form.Control>
        <FormErrorMessage name="value" formik={formik} />
      </Form.Group>

      <Button onClick={handleClick} className="w-25" onBlur={handleBlur}>
        Add
      </Button>
    </div>
  );
}
