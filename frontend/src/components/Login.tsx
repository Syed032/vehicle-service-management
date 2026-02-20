import React, { useState } from "react";
import api from "../services/api";
import loginBg from "../assets/images/login.webp";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await api.post("/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;

      if (!token) {
        alert("Invalid email or password");
        return;
      }

      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));

      const role = payload.role;
      const userEmail = payload.sub;

      localStorage.setItem("role", role);
      localStorage.setItem("email", userEmail);

      if (role === "ROLE_ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }

    } catch (err: any) {
      alert(err.response?.data || "Login failed");
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
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "15px",
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
            marginTop: "15px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={loginUser}
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
          Login
        </button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don’t have an account?{" "}
          <Link to="/signup" style={{ color: "#0066ff", fontWeight: "bold" }}>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
