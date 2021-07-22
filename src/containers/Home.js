import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

import HomePageNavbar from "components/HomePageNavbar";

export default function Home() {
  const { isAuthenticated, user } = useAuth0();
  const history = useHistory();

  // temp way to redirect to setup if the user isnt part of an org
  useEffect(() => {
    if (isAuthenticated) {
      history.push(`/redirect`);
    }
  }, [isAuthenticated, history]);

  console.log(user);
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
