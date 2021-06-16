import React, { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "react-bootstrap";
import UserContext from "context/UserContext";

export default function GetTokenPage() {
  const { user, setUser } = useContext(UserContext);
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
