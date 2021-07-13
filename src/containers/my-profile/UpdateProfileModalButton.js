import React, { useState } from "react";

import Icon from "@mdi/react";
import { mdiCog } from "@mdi/js";
import { Button, Modal } from "react-bootstrap";

export default function UpdateProfileModalButton({ children }) {
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
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>User Profile Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer className="d-none">
          <Button id="userProfileModalClose" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="d-flex" onClick={handleShow}>
        <Icon path={mdiCog} size={1} className="mx-2" />
        <p variant="primary">Profile Settings</p>
      </div>
    </>
  );
}
