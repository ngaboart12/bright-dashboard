// src/App.jsx
import React from "react";
import Dashboard from "./Pages/Dashboard";
import { Navigate, Route, Routes } from "react-router-dom";
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

function App() {
  const isUserLoggedIn = localStorage.getItem("users") !== null;
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {isUserLoggedIn ? (
          <Route path="/" element={<Admin />}>
            <Route index element={<Dashboard />} />
            <Route path="/ass" element={<Assessment />} />
            <Route path="/add" element={<AddSchool />} />
            <Route path="/events" element={<AddEvents />} />
            <Route path="/Offers" element={<Offers />} />
          </Route>
        ) : (
          // Redirect to login if user is not logged in
          <Route path="/*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </>
  );
}

export default App;
