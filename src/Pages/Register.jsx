// Register.js
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update user profile with displayName
      await updateProfile(userCredential.user, { displayName });

      // Add user information to Firestore collection 'users'
      const userDoc = {
        uid: userCredential.user.uid,
        email,
        displayName,
        userType: "user", // Set default user type to 'user'
      };

      // Add user document to Firestore
      const userRef = await addDoc(collection(db, "users"), userDoc);
      const usersJSON = await JSON.stringify(userDoc);

      await localStorage.setItem("users", usersJSON);
      setLoading(false);

      console.log("User registration successful:", userRef.id);
      navigate("/");
      // Registration successful, you can redirect or update the UI as needed.
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div className="w-full flex items-center h-screen justify-center ">
      <div className="w-1/3 bg-white rounded-md p-4 flex flex-col gap-4 items-center">
        <h2 className="text-[24px] font-bold">Create account </h2>
        <form
          action=""
          onSubmit={handleRegister}
          className="flex flex-col gap-4 w-full"
        >
          <input
            type="text"
            placeholder="UserName"
            className="p-4 border bg-transparent rounded-md w-full outline-none"
            value={displayName}
            required
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="p-4 border bg-transparent rounded-md w-full outline-none"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-4 border bg-transparent rounded-md w-full outline-none"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="py-4 bg-blue-500 w-full text-white rounded-md text-[18px]"
            type="submit"
          >
            {loading ? "Loading..." : "Register"}
          </button>
          <span>
            Already have account{" "}
            <a href="/login" className="text-blue-500">
              Login Here
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
