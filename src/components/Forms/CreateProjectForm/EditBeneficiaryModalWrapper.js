import React, { useState } from "react";

import { Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";

export default function EditBeneficiaryModalWrapper({
  children,
  remove,
  index,
  formik,
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
    // if beneficiary errors exist set all fields in form to touched so the errors will show
    if (formik.errors.beneficiaries[`${index}`]) {
      formik.setFieldTouched(`beneficiaries[${index}].name`, true);

      // if there is no life changes the error will be type string. if it is set the touched value to an empty array
      if (
        typeof formik.errors[`beneficiaries`][`${index}`].lifeChange ===
        "string"
      ) {
        formik.setFieldTouched(`beneficiaries[${index}].lifeChange`, []);
        // check if there is life changes then touch each field if there is to show errors
      } else if (formik.errors[`beneficiaries`][`${index}`].lifeChange) {
        formik.errors[`beneficiaries`][`${index}`].lifeChange.forEach(
          (change, cindex) => {
            formik.setFieldTouched(
              `beneficiaries[${index}].lifeChange[${cindex}].description`,
              true
            );
          }
        );
      }
      // if there is no demographics the error will be type string. if it is set the touched value to an empty array
      if (
        typeof formik.errors[`beneficiaries`][`${index}`].demographics ===
        "string"
      ) {
        formik.setFieldTouched(`beneficiaries[${index}].demographics`, []);
        // check if there is demographics then touch each field if there is to show errors
      } else if (formik.errors[`beneficiaries`][`${index}`].demographics) {
        formik.errors[`beneficiaries`][`${index}`].demographics.forEach(
          (change, cindex) => {
            formik.setFieldTouched(
              `beneficiaries[${index}].demographics[${cindex}].name`,
              true
            );
            formik.setFieldTouched(
              `beneficiaries[${index}].demographics[${cindex}].operator`,
              true
            );
            formik.setFieldTouched(
              `beneficiaries[${index}].demographics[${cindex}].value`,
              true
            );
          }
        );
      }

      //Save Data to database or somewhere local ??
    } else {
      //Close Modal if validation and save is successfull
      setShow(false);
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Are you sure?</Popover.Title>
      <Popover.Content>
        <Button
          variant="danger"
          onClick={() => {
            remove(index);
            handleClose();
          }}
          className="mx-2"
        >
          Yes
        </Button>
        <Button
          className="mx-2"
          onClick={() => {
            handleClose();
          }}
        >
          No
        </Button>
      </Popover.Content>
    </Popover>
  );

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer className="justify-content-evenly">
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={popover}
            rootClose
          >
            <Button variant="danger">Delete</Button>
          </OverlayTrigger>

          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Button variant="primary" onClick={handleShow}>
        EDIT
      </Button>
    </>
  );
}
