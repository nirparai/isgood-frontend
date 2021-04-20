import React, { useState } from "react";
import { Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { FieldArray } from "formik";

export default function ModalContainer({ children, remove, index }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      <Modal show={show} onHide={handleClose}>
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
          <Button variant="primary" onClick={handleClose}>
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
