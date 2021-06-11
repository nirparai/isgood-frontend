import React, { useContext } from "react";
import UserContext from "context/UserContext";

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  return (
    <div className="container">
      <div className="row justify-content-center mb-4">
        <h1 className="">User Profile</h1>
      </div>
      <div className="row justify-content-center mb-4">
        <img
          src={`http://localhost:8000/api/images/${user.userData.user_metadata.profileImageLocation}`}
          className="img-xs rounded-circle"
          width={150}
          alt="profile"
        />
      </div>

      <div className="row justify-content-center py-2 bg-primary mb-4"></div>

      <div className="row justify-content-center mb-4">
        <div className="col justify-content-center mb-4">
          <div className="row justify-content-center mb-4">
            <p>First Name</p>
          </div>
          <div className="row justify-content-center mb-4">
            <p>Last Name</p>
          </div>
          <div className="row justify-content-center mb-4">
            <p>Handle</p>
          </div>
          <div className="row justify-content-center mb-4">
            <p>Base Location</p>
          </div>
          <div className="row justify-content-center mb-4">
            <p>Time Zone</p>
          </div>
        </div>
        <div className="col justify-content-center mb-4">
          <div className="row justify-content-center mb-4">
            <p>{user.userData.given_name}</p>
          </div>
          <div className="row justify-content-center mb-4">
            <p>{user.userData.family_name}</p>
          </div>
          <div className="row justify-content-center mb-4">
            <p>{user.userData.nickname}</p>
          </div>
          <div className="row justify-content-center mb-4">
            <p>{user.userData.user_metadata.location}</p>
          </div>
          <div className="row justify-content-center mb-4">
            <p>{user.userData.user_metadata.timezone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
