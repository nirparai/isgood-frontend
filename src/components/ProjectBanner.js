import React from "react";

import AWSImage from "./AWSImage";

export default function ProjectBanner({ project }) {
  return (
    <div className="container-fluid w-100 d-flex justify-content-center bg-secondary">
      <AWSImage
        location={project.banner.location}
        alt="Org Banner"
        className="img-fluid"
      />
    </div>
  );
}
