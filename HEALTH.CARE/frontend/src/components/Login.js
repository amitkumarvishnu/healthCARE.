import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({
  setToken,
  setPatientId,
  setUsername,
  setRole,
  setDoctorId,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      const {
        token,
        userId,
        username,
        role,
        doctorId: receivedDoctorId,
      } = response.data;

      setToken(token);
      setPatientId(userId);
      setUsername(username);
      setRole(role);
      localStorage.setItem("token", token);
      localStorage.setItem("patientId", userId);
      localStorage.setItem("role", role);

      if (role === "doctor") {
        setDoctorId(receivedDoctorId);
        localStorage.setItem("doctorId", receivedDoctorId);
        navigate("/doctor-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(
        "Login failed",
        error.response ? error.response.data : error
      );
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-200 to-blue-300">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md border border-gray-300">
        <h2 className="text-4xl font-bold text-center text-green-600 mb-6">
          Healthcare Login
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className={`w-full p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{" "}
          <a href="/register" className="text-green-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
