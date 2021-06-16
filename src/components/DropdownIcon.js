import React from "react";

import { LinkContainer } from "react-router-bootstrap";
import Icon from "@mdi/react";
import { mdiDotsVertical } from "@mdi/js";

export default React.forwardRef(function DropdownIcon(
  { children, onClick },
  ref
) {
  return (
    <div>
      <Icon path={mdiDotsVertical} size={1} ref={ref} onClick={onClick} />
    </div>
  );
});
