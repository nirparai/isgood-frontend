// component for deleting a value/input in a FieldArray

import React from "react";
import { Button, Popover, OverlayTrigger } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiDelete } from "@mdi/js";

export default function FieldArrayDeleteBtn({
  arrayHelpers,
  index,
  setdeleteIds,
}) {
  const handleClick = () => {
    // arrayHelpers.remove  Removes an element at an index of an array and returns it
    // the element that is removed should be an object with {description: "", id: ""}
    // the index should be the index returned from mapping through the array value of a field
    const element = arrayHelpers.remove(index);
    if (setdeleteIds) {
      setdeleteIds((prev) => [...prev, element.id]);
    }
    // This is to close the popover, couldnt find a better way so leaving it like this for now
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
        <Icon path={mdiDelete} size={1} />
      </OverlayTrigger>
    </div>
  );
}
