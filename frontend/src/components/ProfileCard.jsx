import React from "react";
import ProfileImage from "./ProfileImage";

export default function ProfileCard({ profileImageSrc, name, specialization }) {
  return (
    <div className="profile-card">
      <ProfileImage src={profileImageSrc} />
      <div className="profile-name">{name}</div>
      {specialization && (
        <div className="profile-specialization">{specialization}</div>
      )}
    </div>
  );
}
