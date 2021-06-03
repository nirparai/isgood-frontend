import React from "react";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiDelete, mdiCloseCircle } from "@mdi/js";

export default function FieldArrayDelete({ arrayHelpers, index }) {
  const handleClick = () => {
    arrayHelpers.remove(index);
    document.body.click();
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Are you sure?</Popover.Title>
      <Popover.Content>
        <Button variant="danger" onClick={handleClick} className="mx-2">
          Yes
        </Button>
        <Button className="mx-2" onClick={() => document.body.click()}>
          No
        </Button>
      </Popover.Content>
    </Popover>
  );
  return (
    <div className="d-flex justify-content-center align-items-center">
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={popover}
        rootClose
      >
        <Icon path={mdiCloseCircle} size={1} />
      </OverlayTrigger>
    </div>
  );
}
