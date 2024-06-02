import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiHide } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

function isPasswordValid(password) {
  // Criteria for a valid password
  const minLength = 8;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasDigit = /\d/;
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

  // Check if password meets all criteria
  if (password.length < minLength) {
    alert("Password is too short");
    return false;
  }
  if (!hasUpperCase.test(password)) {
    alert("Password does not contain an uppercase letter");
    return false;
  }
  if (!hasLowerCase.test(password)) {
    alert("Password does not contain a lowercase letter");
    return false;
  }
  if (!hasDigit.test(password)) {
    alert("Password does not contain a digit");
    return false;
  }
  if (!hasSpecialChar.test(password)) {
    alert("Password does not contain a special character");
    return false;
  }

  return true;
}

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (formData.password !== formData.confirmPassword) {
        setIsLoading(false);
        setMessage("Passwords do not match");
        alert("Passwords do not match");
        return;
      }
      if (
        !isPasswordValid(formData.password) &&
        !isPasswordValid(formData.password)
      ) {
        setIsLoading(false);
        setMessage(
          "Password should be at least 8 characters long and include one uppercase letter, one lowercase letter, one special character, and one digit."
        );
        return;
      }
      const response = await fetch(
        "https://node-auth-dk2l.onrender.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        alert(data.msg);
        setMessage(data.msg);
        navigate("/signin");
      } else {
        alert(data.msg + " Sign in instead");
        setMessage(data.msg || "An error occurred");
        navigate("/");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error:", error);
      setMessage("An error occurred");
    }
    // Reset form values
    setFormData({
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Signup</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Type your email here"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Type your password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[2.4rem] text-gray-600"
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </button>
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Confirm Password:</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-[2.4rem] text-gray-600"
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </button>
          </div>
          {!isLoading && (
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-colors"
            >
              Signup
            </button>
          )}
          {isLoading && (
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition-colors"
            >
              Loading...
            </button>
          )}
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Signup;
