import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Transfer = () => {
  const navigate = useNavigate();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    const userJSON = localStorage.getItem("users");

    if (userJSON) {
      const userData = JSON.parse(userJSON);
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
      // Redirect to the login page
      navigate("/login");
    }
  }, [navigate]);

  if (isUserLoggedIn === null) {
    // Loading state while checking authentication
    return <div>Loading...</div>;
  }

  // If user is not logged in, redirect to login
  if (!isUserLoggedIn) {
    return <div>Redirecting to login...</div>;
  }

  // If user is logged in, navigate to "/admin"
  navigate("/admin");

  // You can also return null here if you don't want to render anything for the logged-in state
  return null;
};

export default Transfer;
