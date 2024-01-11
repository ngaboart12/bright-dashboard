import React, { useEffect, useState } from "react";

const Navbar = () => {
  const handleLogout = () => {
    // Remove 'users' from local storage
    localStorage.removeItem("users");

    // Redirect to the login page (replace with your actual login page URL)
    window.location.href = "/";
  };
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const userJSON = localStorage.getItem("users");

    const userInfo = JSON.parse(userJSON);
    setUserData(userInfo);
  });

  return (
    <div className="flex flex-row justify-between">
      <h1>Dashboard</h1>
      <div className="flex flex-row items-center gap-4">
        <h1>{userData?.displayName}</h1>
        <div className="w-10 h-10 rounded-full bg-black/20"></div>
        <a href="#" className="text-[10px]" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Navbar;
