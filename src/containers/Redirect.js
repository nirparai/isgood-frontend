import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "context/UserContext";

export default function Redirect() {
  const history = useHistory();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user.userData.user_metadata.lastOrg) {
      history.push(
        `/home/myorganisations/${user.userData.user_metadata.lastOrg}`
      );
    } else {
      history.push("/setup/welcome");
    }
  }, []);

  return (
    <div>
      <h1 className="text-center m-5">Fetching Data and Redirecting</h1>
    </div>
  );
}
