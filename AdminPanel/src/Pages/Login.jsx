import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "", role: "admin" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    const adminEmail = "sarkarcscpatherwa@gmail.com"; // ✅ Corrected email format
   const adminPassword = "sonu7565";

  
    if (formData.email === adminEmail && formData.password === adminPassword) {
      // Store token in localStorage
      localStorage.setItem("token", "fake-admin-token");
      localStorage.setItem("role", "admin");
  
      alert("Login successful!");
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-box">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            className="input-field"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            className="input-field"
            onChange={handleChange}
            required
          />
          <select name="role" className="input-field" onChange={handleChange} required>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
