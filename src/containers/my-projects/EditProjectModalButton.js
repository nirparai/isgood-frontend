import React, { useState } from "react";
import Icon from "@mdi/react";
import {
  mdiCog,
} from "@mdi/js";
import { Button, Modal } from "react-bootstrap";

export default function EditProjectModalButton({ children }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    //clear fields of modal

    // close modal
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Project Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
      <Button variant="secondary" onClick={handleShow}>
        <Icon path={mdiCog} size={1.5} className="p-1" />
      </Button>
    </>
  );
}