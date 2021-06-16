import React, { useState } from "react";

import { Button, Modal } from "react-bootstrap";

export default function ProfileModalButton({ children }) {
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
<<<<<<< HEAD
      <Modal show={show} onHide={handleClose}>
=======
      <Modal show={show} onHide={handleClose} size="lg">
>>>>>>> cb5a2c57d99cdcff4f6070f9efe696af0f096de4
        <Modal.Header closeButton>
          <Modal.Title>Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer className="justify-content-evenly">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <p variant="primary" onClick={handleShow}>
        Profile
      </p>
    </>
  );
}
