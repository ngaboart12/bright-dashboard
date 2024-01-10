import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Dashboard/Navbar";
import Analytical from "../Dashboard/Analytical";
import Sidebar from "../Dashboard/Sidebar";

const Admin = () => {
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
