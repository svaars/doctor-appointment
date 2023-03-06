import React from "react";

import "./Style/ProfileImage.css";

import Placeholder from "../images/placeholder_profile_image.png";

export default function ProfileImage({ src }) {
  return (
    <div className="profile-image">
      <img src={src || Placeholder} alt="profile" />
    </div>
  );
}
