import React, { useState } from "react";

import * as Yup from "yup";
import { useFormik, FieldArray, FormikProvider } from "formik";

import FormErrorMessage from "components/Forms/FormErrorMessage";
import ArrayFieldError from "components/Forms/CreateProjectForm/FieldArrays/ArrayFieldError";
import { Form, Modal, Button } from "react-bootstrap";
import ArrayInput from "./FieldArrays/ArrayInput";
import ArrayField from "./FieldArrays/ArrayField";
import DemographicArrayInput from "./FieldArrays/DemographicArrayInput";
import ArrayFieldDemographic from "./FieldArrays/ArrayFieldDemographic";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  lifeChange: Yup.array()
    .of(
      Yup.object()
        .shape({
          id: Yup.string(),
          description: Yup.string().required("Required"),
        })
        .required("Required")
    )
    .min(1, "Add at least one change"),
  demographics: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Required"),
        operator: Yup.string().required("Required"),
        value: Yup.string().required("Required"),
        id: Yup.string(),
      })
    )
    .min(1, "Add at least one demographic"),
  id: Yup.string(),
});

export default function AddBeneficiaryForm({ arrayHelpers }) {
  const [show, setShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      lifeChange: [],
      demographics: [],
      id: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, methods) => {
      arrayHelpers.insert(0, {
        name: values.name,
        lifeChange: values.lifeChange,
        demographics: values.demographics,
        id: values.id,
      });
      methods.resetForm();
      setShow(false);
    },
  });

  const handleClose = () => {
    //clear fields of modal

    // close modal
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleSave = async () => {
    await formik.submitForm();
  };
  console.log(formik);
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Beneficiary Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId={`name`}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              autoFocus
              placeholder=""
              name={`name`}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />

            <FormErrorMessage name={`name`} formik={formik} />
          </Form.Group>

          <FormikProvider value={formik}>
            <FieldArray name={`lifeChange`}>
              {(changeArrayHelpers) => (
                <>
                  <ArrayInput
                    arrayHelpers={changeArrayHelpers}
                    label="How does the life of this group change?"
                    placeholder="Ex Support & Resources"
                  />

                  {formik.values.lifeChange.map((change, changeIndex) => (
                    <ArrayField
                      name={`lifeChange`}
                      key={changeIndex}
                      formik={formik}
                      arrayHelpers={changeArrayHelpers}
                      index={changeIndex}
                      value={change}
                      placeholder="Input change here ..."
                    />
                  ))}
                </>
              )}
            </FieldArray>
            <ArrayFieldError name={`lifeChange`} />

            <FieldArray name={`demographics`}>
              {(demographicArrayHelpers) => (
                <>
                  <Form.Label>Demographics</Form.Label>
                  <DemographicArrayInput
                    arrayHelpers={demographicArrayHelpers}
                    placeholder="Choose..."
                  />
                  {formik.values.demographics.map(
                    (demographic, demographicIndex) => (
                      <ArrayFieldDemographic
                        name={`demographics`}
                        key={demographicIndex}
                        formik={formik}
                        arrayHelpers={demographicArrayHelpers}
                        demographicIndex={demographicIndex}
                        value={demographic}
                        placeholder="Choose ..."
                      />
                    )
                  )}
                  <ArrayFieldError name={`demographics`} />
                </>
              )}
            </FieldArray>
          </FormikProvider>
        </Modal.Body>
        <Modal.Footer className="justify-content-evenly">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="primary" onClick={handleShow}>
        + Add Beneficiary
      </Button>
    </>
  );
}
