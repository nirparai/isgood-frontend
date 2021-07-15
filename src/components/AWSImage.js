import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import ImageService from "services/imageService";
export default function AWSImage({ location, alt, height, width, className }) {
  const [image, setImage] = useState(null);
  const handleImage = () => {
    const callback = (result) => {
      setImage(result);
    };
    ImageService.getImage(location, callback);
  };
  useEffect(() => {
    if (location) {
      handleImage();
    }
  }, [location]);
  return (
    <>
      <img
        src={location ? image : null}
        alt={alt}
        height={height}
        width={width}
        className={className}
      />
      {/* <Image
        src={location ? `http://localhost:8000/api/images/${location}` : null}
        rounded
      /> */}
    </>
  );
}
