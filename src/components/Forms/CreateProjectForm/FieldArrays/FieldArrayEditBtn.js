import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiSquareEditOutline, mdiCheckBold } from "@mdi/js";

// This component is for toggling the isEditing state for an ArrayField component
export default function FieldArrayEditBtn({
  inputRef,
  isEditing,
  setIsEditing,
}) {
  const handleClick = () => {
    // Simple toggle of isEditing state
    setIsEditing((prev) => !prev);
    // focuses the cursor on the input the inputRef is put on
    if (isEditing) {
      inputRef.current.focus();
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Icon
        path={isEditing ? mdiCheckBold : mdiSquareEditOutline}
        size={1}
        onClick={handleClick}
      />
    </div>
  );
}
