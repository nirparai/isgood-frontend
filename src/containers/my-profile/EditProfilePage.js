import React, { useContext } from "react";
import UserContext from "context/UserContext";

import PersonaliseForm from "components/PersonaliseForm";

export default function EditProfilePage() {
  const { user } = useContext(UserContext);
  return (
    <>
      <PersonaliseForm userData={user.userData} setup={false} />
    </>
  );
}
