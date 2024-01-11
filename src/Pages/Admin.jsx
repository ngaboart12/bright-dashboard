import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Dashboard/Navbar";
import Analytical from "../Dashboard/Analytical";
import Sidebar from "../Dashboard/Sidebar";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in by checking localStorage
    const storedUser = JSON.parse(localStorage.getItem("users"));

    if (storedUser) {
      // User is logged in
      setUser(storedUser);
    } else {
      // User is not logged in, redirect to login page
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="flex w-full bg-gray-200 min-h-[100vh] ">
        <Sidebar />
        <div className="w-full flex flex-col gap-4">
          <div className="px-10 p-2 flex flex-col">
            <Navbar />
            <Analytical />
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
