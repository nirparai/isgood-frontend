import React from "react";
import { useParams } from "react-router-dom";

export default function OrganisationPage() {
  const { orgId } = useParams();

  return (
    <div>
      <h1>Org</h1>
      {`This is the page of organisation with id of ${orgId}`}
    </div>
  );
}
