import React, { useState, useRef, useEffect } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

export default function ArrayInputPatch({ arrayHelpers, label, placeholder }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    if (value !== "") {
      setError("");
    }
  }, [value]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = () => {
    if (value === "") {
      setError("Required");
    } else {
      arrayHelpers.insert(0, { id: null, description: value });
      setValue("");
    }
    inputRef.current.focus();
  };
  const handleBlur = () => {
    if (error) {
      setError("");
    }
  };

  return (
    <>
      <Form.Label>{label}</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder={placeholder}
          name="value"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          ref={inputRef}
        />
        <InputGroup.Append>
          <Button onClick={handleClick}>Add</Button>
        </InputGroup.Append>
      </InputGroup>

      <div className="text-danger">{error}</div>
    </>
  );
}
