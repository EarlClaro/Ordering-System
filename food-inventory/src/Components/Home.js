import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated from 'useHistory'
import Login from "./Login"; // Assuming you have a Login.js component for the login form
import "../Styles/home.css";

const Home = () => {
  const [showLogin, setShowLogin] = useState(true); // Toggle between Login and Register
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    // This function can be triggered after successful login
    navigate("/dashboard"); // Redirect to dashboard after login
  };

  return (
    <div className="container">
      <header className="header">
        <h1 style={{ color: "black" }}>PIMS Paeng Inventory Management System</h1>
      </header>
      
      <div className="auth-container">
        {showLogin ? (
          <div className="login-form">
            <Login onLoginSuccess={handleLoginSuccess} />
            <p className="register-link" style={{ color: "black" }}>
              Don't have an account?{" "}
              <a href="/register" onClick={() => setShowLogin(false)}>
                Register here
              </a>
            </p>
          </div>
        ) : (
          <div className="register-form">
            <h2>Register</h2>
            <p>Registration functionality can be added here.</p>
            <button onClick={() => setShowLogin(true)}>Back to Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
