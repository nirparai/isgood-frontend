import React from 'react';
import toStars from "assets/to-the-stars.png";

export default function LogoutSuccess() {
  return (
    <div className="mt-4" align="center">
      <h1 className="my-4">isgood.ai</h1>
      <p className="my-4">
        <b>You have successfully logged out!</b>
      </p>
      {/* TODO: REPLACE WITH PROPER IMAGE */}
      <img src={toStars} className="toStars" />
    </div>
  )
}
