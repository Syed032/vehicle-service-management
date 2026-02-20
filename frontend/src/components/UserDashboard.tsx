import React from "react";
import { Link, useNavigate } from "react-router-dom";
import userBg from "../assets/images/user.avif";

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let email = "";
  let role = "";

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      email = payload.sub;
      role = payload.role;

    } catch (error) {
      localStorage.clear();
      navigate("/");
    }
  } else {
    navigate("/");
  }

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundImage: `url(${userBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "90vh",
        paddingTop: "80px",
      }}
    >
      <div style={{ textAlign: "center", marginTop: "120px" }}>
        <h1 style={{ color: "white", fontSize: "40px" }}>
          User Dashboard
        </h1>

        <p style={{ color: "white", fontSize: "25px" }}>
          Welcome <strong>{email}</strong> <br />
          Role: <strong>{role}</strong>
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/user/book-slot">
            <button style={btnStyle}>Book Service</button>
          </Link>

          <Link to="/user/add-vehicle">
            <button style={btnStyle}>Add Vehicle</button>
          </Link>

          <Link to="/user/bookings">
            <button style={btnStyle}>My Bookings</button>
          </Link>

          <Link to="/user/history">
            <button style={btnStyle}>Service History</button>
          </Link>

          <Link to="/user/invoices">
            <button style={btnStyle}>Payments</button>
          </Link>

          <Link to="/user/profile">
            <button style={btnStyle}>Profile</button>
          </Link>

          <button
            onClick={logout}
            style={{
              background: "#ff3333",
              fontWeight: "bold",
              width: "120px",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const btnStyle: React.CSSProperties = {
  backgroundColor: "#0066ff",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "16px",
};

export default UserDashboard;
