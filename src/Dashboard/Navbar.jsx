import React from "react";

const Navbar = () => {
  return (
    <div className="flex fex-row justify-between">
      <h1>Dashboard</h1>
      <div className="flex flex-row items-center gap-4">
        <h1>Aime!</h1>
        <div className="w-10 h-10 rounded-full bg-black/20"></div>
        <a href="#" className="text-[10px]">
          Logout
        </a>
      </div>
    </div>
  );
};

export default Navbar;
