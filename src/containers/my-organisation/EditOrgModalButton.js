import React, { useState } from "react";
import Icon from "@mdi/react";
import {
  mdiCog,
} from "@mdi/js";
import { Button, Modal } from "react-bootstrap";

export default function EditOrgModalButton({ children }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    //clear fields of modal

    // close modal
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleSave = () => {
    //Check Validation

    //Save Data to database or somewhere local ??

    //Close Modal if validation and save is successful
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="w-100 text-center">Organisation Details Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
      <Button variant="secondary" onClick={handleShow}>
        <Icon path={mdiCog} size={1.5} className="p-1" />
      </Button>
    </>
  );
}
