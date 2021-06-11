import React from "react";

export default function AWSImage({ location, alt, height, width, className }) {
  return (
    <img
      src={location ? `http://localhost:8000/api/images/${location}` : null}
      alt={alt}
      height={height}
      width={width}
      className={className}
    />
  );
}
