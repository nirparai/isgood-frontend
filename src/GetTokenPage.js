// This needs to be Removed before putting up to production, Is only here for testing during development.

import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";

export default function GetTokenPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("Click Button for Token");

  const getToken = async () => {
    const res = await getAccessTokenSilently();
    console.log(res);
    setToken(res);
  };
  return (
    <div className="container">
      <Button onClick={getToken}>CLICK</Button>
      <div className="row text-break">
        <p>{token}</p>
      </div>
    </div>
  );
}
