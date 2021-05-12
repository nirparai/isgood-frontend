import React, { useEffect, useContext } from "react";
import HomePageNavbar from "../components/HomePageNavbar";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Home() {
  const { currentOrgId } = useContext(UserContext);
  const { isAuthenticated } = useAuth0();
  const history = useHistory();

  // temp way to redirect to setup if the user isnt part of an org
  useEffect(() => {
    if (isAuthenticated && currentOrgId) {
      history.push(`/home/myorganisations/${currentOrgId}`);
    } else if (isAuthenticated) {
      history.push("/setup/welcome");
    }
  }, [isAuthenticated]);
  return (
    <div className="container">
      <HomePageNavbar />
      <div className="text-center mt-5">
        <h1 className="my-4">isgood.ai</h1>
        <p className="text-muted">
          Social Impact and Outcomes Optimisation Platform
        </p>
      </div>
    </div>
  );
}
