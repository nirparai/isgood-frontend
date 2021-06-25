import React, { useState } from "react";

import { Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";

export default function AddBeneficiaryModalWrapper({
  children,
  formik,
  field,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    //clear fields of modal

    // close modal
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleSave = () => {
    //Check Validation
    formik.validateForm();

    // if (formik.errors[field]) {
    //   formik.setFieldTouched(`${field}[${index}].name`, true);
    //   if (
    //     typeof formik.errors[`${field}`][`${index}`].lifeChange === "string"
    //   ) {
    //     formik.setFieldTouched(`${field}[${index}].lifeChange`, []);
    //   } else {
    //     formik.errors[`${field}`][`${index}`].lifeChange.forEach(
    //       (change, cindex) => {
    //         formik.setFieldTouched(
    //           `${field}[${index}].lifeChange[${cindex}]`,
    //           true
    //         );
    //       }
    //     );
    //   }
    //   //Save Data to database or somewhere local ??
    // } else {
    //   //Close Modal if validation and save is successfull
    //   setShow(false);
    // }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
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
