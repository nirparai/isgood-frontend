import React from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormErrorMessage from "components/Forms/FormErrorMessage";

export default function DemographicArrayInput({ arrayHelpers, placeholder }) {
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
      arrayHelpers.insert(0, {
        name: values.name,
        operator: values.operator,
        value: values.value,
        id: "",
      });
      methods.resetForm();
    },
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
          name="name"
          as="select"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        >
          <option value="">Choose...</option>
          <option value="gender">Gender</option>
          <option value="age">Age</option>
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
          <option value="">Choose...</option>
          <option> &lt;</option>
          <option> &gt;</option>
          <option>=</option>
          <option>!=</option>
          <option>equal to</option>
          <option>greater than</option>
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
          <option value="">Choose...</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
          <option>18 to 25</option>
          <option>25 to 40</option>
          <option>65</option>
          <option>10</option>
        </Form.Control>
        <FormErrorMessage name="value" formik={formik} />
      </Form.Group>

      <Button onClick={handleClick} className="w-25" onBlur={handleBlur}>
        Add
      </Button>

      {/* <div className="text-danger">{formik.error}</div> */}
    </div>
  );
}
