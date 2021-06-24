import React, { useState } from "react";

import { Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";

export default function ModalContainer({
  children,
  remove,
  index,
  formik,
  field,
}) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    //clear fields of modal

    // close modal
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleSave = () => {
    //Check Validation
    formik.validateForm();

    if (formik.errors[field]) {
      formik.setFieldTouched(`${field}[${index}].name`, true);
      if (
        typeof formik.errors[`${field}`][`${index}`].lifeChange === "string"
      ) {
        formik.setFieldTouched(`${field}[${index}].lifeChange`, []);
      } else {
        formik.errors[`${field}`][`${index}`].lifeChange.forEach(
          (change, cindex) => {
            formik.setFieldTouched(
              `${field}[${index}].lifeChange[${cindex}]`,
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

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
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
