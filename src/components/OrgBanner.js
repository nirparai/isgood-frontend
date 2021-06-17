import React from "react";

import AWSImage from "./AWSImage";

export default function OrgBanner({ org }) {
  return (
    <div className="container-fluid w-100 d-flex justify-content-center bg-secondary">
      <AWSImage
        location={org.banner && org.banner.location}
        alt="Org Banner"
        className="img-fluid"
        height={150}
      />
    </div>
  );
}
