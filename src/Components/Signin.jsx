import React, { useState, useContext } from "react";
import AuthContext from "../../AuthContext";
import { DataContext } from "../../DataContext";
import { redirect, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authCtx = useContext(AuthContext);
  const ctx = useContext(DataContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Example payload for login (adjust based on your backend API)
    const loginPayload = {
      username: email,
      password: password,
    };

    try {
      console.log("initiating request");
      const response = await fetch("http://localhost:3000/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload),
      });
      console.log("request made waiting for response");
      if (!response.ok) {
        throw new Error("Failed to login!");
      }

      const data = await response.json();
      const expirationTime = new Date(new Date().getTime() + 3600 * 1000); // 1 hour expiration
      console.log("received data is: ", data);
      authCtx.login(data.token, expirationTime.toISOString());
      ctx.setUserDetails(data.user);
      navigate("/cart");
    } catch (error) {
      console.error(error);
      alert("Login failed. Please check your credentials and try again.");
      return redirect("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
