import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import AddSchool from "./Pages/AddSchool";
import Sidebar from "./Dashboard/Sidebar";
import Assessment from "./Pages/Assessment";
import AddEvents from "./Pages/AddEvents";
import Offers from "./Pages/Offers";
import Navbar from "./Dashboard/Navbar";
import Analytical from "./Dashboard/Analytical";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import Transfer from "./Pages/Transfer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Transfer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard />} />
          <Route path="ass" element={<Assessment />} />
          <Route path="add" element={<AddSchool />} />
          <Route path="events" element={<AddEvents />} />
          <Route path="offers" element={<Offers />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
