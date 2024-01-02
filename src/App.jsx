// src/App.jsx
import React from "react";
import Dashboard from "./Pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import AddSchool from "./Pages/AddSchool";
import Sidebar from "./Dashboard/Sidebar";
import Assessment from "./Pages/Assessment";
import AddEvents from "./Pages/AddEvents";
import Offers from "./Pages/Offers";
import Navbar from "./Dashboard/Navbar";
import Analytical from "./Dashboard/Analytical";

function App() {
  return (
    <div className="flex w-full bg-gray-200 min-h-[100vh] ">
      <Sidebar />
      <div className="w-full flex flex-col gap-4">
        <div className="px-10 p-2 flex flex-col">
          <Navbar />
          <Analytical />
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ass" element={<Assessment />} />
          <Route path="/add" element={<AddSchool />} />
          <Route path="/events" element={<AddEvents />} />
          <Route path="/Offers" element={<Offers />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
