import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function ModalContainer({
  modalTitle,
  toggleComponent, //custom component passed down to trigger the modal
  modal,
  footerComponent,
}) {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    //clear fields of modal
    // close modal
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal}</Modal.Body>
        {footerComponent}
      </Modal>
      <div className="d-flex" onClick={handleShow}>
        {toggleComponent}
      </div>
    </>
  );
}
