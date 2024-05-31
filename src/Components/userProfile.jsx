import React, { useContext } from "react";
import { DataContext } from "../../DataContext";

function UserProfile() {
  const ctx = useContext(DataContext);
  const { user } = ctx;
  console.log("User details are: ", user);
  return (
    <div className="h-screen bg-gray-200 pt-5">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-semibold">User Profile</div>
        <div className="text-sm font-bold">Welcome user</div>
      </div>
      <div className="bg-gray-400">
        <div className="text-sm">Name: </div>
        <div className="text-sm">Email: </div>
      </div>
    </div>
  );
}

export default UserProfile;
