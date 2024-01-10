// Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Sign in user with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Access user information directly from Firebase Auth
      const user = userCredential.user;
      const targetUid = user.uid;
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", targetUid));

      const querySnapshot = await getDocs(q);
      const users = [];

      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      const userData = {
        uid: users[0].uid,
        displayName: users[0].displayName,
        email: users[0].email,
        userType: users[0].userType,
      };

      const usersJSON = await JSON.stringify(userData);

      // Set the users JSON string in the local storage under the key 'users'
      localStorage.setItem("users", usersJSON);

      navigate("/");
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div className="w-full flex items-center h-screen justify-center ">
      <div className="w-1/3 bg-white rounded-md p-4 flex flex-col gap-4 items-center">
        <h2 className="text-[24px] font-bold">Welcome Again</h2>
        <input
          type="email"
          placeholder="Email"
          className="p-4 border bg-transparent rounded-md w-full outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 border bg-transparent rounded-md w-full outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="py-4 bg-blue-500 w-full text-white rounded-md text-[18px]"
        >
          Login
        </button>
        <span>
          Dont have account?{" "}
          <a href="/register" className="text-blue-500">
            Register Here
          </a>
        </span>
      </div>
    </div>
  );
};

export default Login;
