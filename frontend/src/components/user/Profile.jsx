import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ProfileSidebar from "./partials/ProfileSidebar";
import UpdateUserInfo from "./UpdateUserInfo";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, [isLoggedIn, navigate]);
  console.log("Profile component");
  return (
    <div className="flex my-8 gap-6">
      <ProfileSidebar />
      <UpdateUserInfo profile={true} />
    </div>
  );
}
