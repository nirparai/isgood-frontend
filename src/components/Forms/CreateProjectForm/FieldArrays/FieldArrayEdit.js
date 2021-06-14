import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Icon from "@mdi/react";
import { mdiSquareEditOutline, mdiCheckBold } from "@mdi/js";

export default function FieldArrayEdit({ arrayHelpers, index, inputRef }) {
  const [isEditing, setIsEditing] = useState(false);
  const handleClick = () => {
    inputRef.current.classList.toggle("disabled");
    setIsEditing(() => !isEditing);
    if (!inputRef.current.classList.contains("disabled")) {
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
