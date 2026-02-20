import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import loginBg from "../assets/images/login.webp";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const validatePassword = (pwd: string) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/;
    return pattern.test(pwd);
  };

  const registerUser = async () => {
    setError("");

    if (!validatePassword(password)) {
      setError(
        "Password must contain: 1 uppercase, 1 lowercase, 1 special char, and minimum 6 characters."
      );
      return;
    }

    try {
      await api.post("/api/auth/register", {
        name,
        email,
        mobile,
        password,
      });

      alert("Account created successfully! Please login.");
      navigate("/");

    } catch (err: any) {
      const message =
        err.response?.data || "Something went wrong. Try again.";
      setError(message);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "350px",
          backgroundColor: "rgba(255, 255, 255, 0.88)",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Sign Up</h2>

        {error && (
          <p style={{ color: "red", fontSize: "14px", marginBottom: "5px" }}>
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={registerUser}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            backgroundColor: "#0066ff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Register
        </button>

        <p style={{ marginTop: "10px", textAlign: "center" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={{ color: "#0066ff", cursor: "pointer", fontWeight: "bold" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
