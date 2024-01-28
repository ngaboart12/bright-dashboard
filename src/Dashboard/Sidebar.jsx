import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaSchool } from "react-icons/fa";
import { FaQuestion , FaHeart} from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";


const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  console.log(pathname);
  return (
    <div className="flex flex-col px-6 gap-7">
      <div>
        <h1 className="text-[26px] font-bold">BrightForth</h1>
      </div>
      <div className="flex flex-col-gap-2">
        <div className="flex gap-2 items-center">
          <MdDashboard /> <span>Dashboard</span>
        </div>
      </div>
      <a
        href="/"
        className={`${
          pathname === "/" ? "bg-blue-500 text-white" : ""
        } flex gap-2 items-center p-2 rounded-md`}
      >
        <FaSchool /> <span>Appliation</span>
      </a>
      <Link
        to="/admin/ass"
        className={`${
          pathname === "/admin/ass" ? "bg-blue-500 text-white" : ""
        } flex gap-2 items-center p-2 rounded-md`}
      >
        <FaQuestion /> <span>Assessment</span>
      </Link>
      <a
        href="/admin/add"
        className={`${
          pathname === "/admin/add" ? "bg-blue-500 text-white" : ""
        } flex gap-2 items-center p-2 rounded-md`}
      >
        <IoAddCircleSharp /> <span>Add school</span>
      </a>
      <a
        href="/admin/events"
        className={`${
          pathname === "/admin/events" ? "bg-blue-500 text-white" : ""
        } flex gap-2 items-center p-2 rounded-md`}
      >
        <IoAddCircleSharp /> <span>Add events</span>
      </a>
      <a
        href="/admin/offers"
        className={`${
          pathname === "/admin/offers" ? "bg-blue-500 text-white" : ""
        } flex gap-2 items-center p-2 rounded-md`}
      >
        <IoAddCircleSharp /> <span>Offers</span>
      </a>
      <a
        href="/admin/subscription"
        className={`${
          pathname === "/admin/subscription" ? "bg-blue-500 text-white" : ""
        } flex gap-2 items-center p-2 rounded-md`}
      >
<FaHeart /><span>Subscription</span>
      </a>
    </div>
  );
};

export default Sidebar;
