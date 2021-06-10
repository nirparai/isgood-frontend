import React, { useContext } from "react";
import PersonaliseForm from "components/PersonaliseForm";
import UserContext from "context/UserContext";

export default function ProfilePageEdit() {
  const { user } = useContext(UserContext);
  return (
    <>
      <PersonaliseForm userData={user.userData} setup={false} />
    </>
  );
}
