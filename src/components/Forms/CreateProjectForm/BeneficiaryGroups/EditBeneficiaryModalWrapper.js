// Modal Wrapper for EditBeneficaryForm that renders the children element
// handles opening and closing of Modal aswell as deleting BeneficaryGroup

// rendered by BeneficiaryGroups.js

import React, { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from "context/UserContext";

import { Button, Modal, Popover, OverlayTrigger } from "react-bootstrap";
import ProjectService from "services/projectService";

export default function EditBeneficiaryModalWrapper({
  children,
  remove,
  index,
  formik,
  project,
}) {
  const [show, setShow] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const { user, setUser } = useContext(UserContext);

  const handleClose = () => {
    // clear fields of modal

    // close modal
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    //Check Validation
    await formik.validateForm();
    //get fieldErrors
    const fieldErrors = formik.getFieldMeta(`beneficiaries[${index}]`).error;
    // if beneficiary errors exist set all fields in form to touched so the errors will show
    if (fieldErrors) {
      // If there are errors touch all fields with errors so they show
      formik.setFieldTouched(`beneficiaries[${index}].name`, true);

      // if there is no life changes the error will be type string. if it is set the touched value to an empty array
      if (
        fieldErrors.lifeChange &&
        typeof fieldErrors.lifeChange === "string"
      ) {
        formik.setFieldTouched(`beneficiaries[${index}].lifeChange`, []);
        // check if there is life changes then touch each field if there is to show errors
      } else if (fieldErrors.lifeChange) {
        fieldErrors.lifeChange.forEach((change, cindex) => {
          formik.setFieldTouched(
            `beneficiaries[${index}].lifeChange[${cindex}].description`,
            true
          );
        });
      }
      // if there is no demographics the error will be type string. if it is set the touched value to an empty array
      if (
        fieldErrors.demographics &&
        typeof fieldErrors.demographics === "string"
      ) {
        formik.setFieldTouched(`beneficiaries[${index}].demographics`, []);
        // check if there is demographics then touch each field if there is to show errors
      } else if (fieldErrors.demographics) {
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
    } else {
      //Close Modal if validation passes and save is successful

      // Try send update beneficiary request
      try {
        const token = await getAccessTokenSilently();
        const res = await ProjectService.updateBeneficiaryGroup(
          token,
          project.id,
          project.org_id,
          formik.values.beneficiaries[`${index}`]
        );
        console.log(res.data);
        await setUser((state) => {
          const newBeneficiary = res.data;
          let newCurrentProject = state.currentProject;
          // check if there is a beneficiary group with the same id already in state (for if beneficiary is updated)
          const beneficiaryIndex = newCurrentProject.beneficiaries.findIndex(
            (beneficiary, index) => beneficiary.id === newBeneficiary.id
          );
          // array.findIndex() return -1 if no element meets condition so we can just push the new beneficiary group in
          if (beneficiaryIndex === -1) {
            newCurrentProject.beneficiaries.push(newBeneficiary);
          } else {
            // splice in the new updated project otherwise
            newCurrentProject.beneficiaries.splice(
              beneficiaryIndex,
              1,
              newBeneficiary
            );
          }

          return { ...state, currentProject: newCurrentProject };
        });

        setShow(false);
      } catch (err) {
        console.log(err);
      }
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
