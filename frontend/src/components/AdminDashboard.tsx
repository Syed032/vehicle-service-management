import { Link, useNavigate } from "react-router-dom";
import serviceImg from "../assets/images/adminlogo.png";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f5f7fb",
      }}
    >
      {/* -------- NAVBAR -------- */}
      <div
        style={{
          width: "100%",
          background: "#002b5c",
          padding: "12px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        {/* ADMIN LINKS */}
        <div style={{ display: "flex", gap: "12px" }}>
          <NavBtn to="/admin/bookings" label="Bookings" />
          <NavBtn to="/admin/history" label="Service History" />
          <NavBtn to="/admin/mechanics" label="Employees" />
          <NavBtn to="/admin/profile" label="User Profile" />

        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          style={{
            padding: "8px 18px",
            background: "#ff3333",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>

      {/* -------- MAIN SECTION -------- */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5vw",
          gap: "40px",
          boxSizing: "border-box",
        }}
      >
        {/* LEFT SIDE TEXT */}
        <div style={{ maxWidth: "600px" }}>
          <h1 style={{ color: "#002b5c", fontSize: "42px", margin: 0 }}>
            Admin Dashboard
          </h1>

          <p style={{ fontSize: "18px", color: "#444", marginTop: "10px" }}>
            Manage service bookings and update vehicle service status.
          </p>

          <p style={{ fontSize: "16px", color: "#777", marginTop: "20px" }}>
            Use the navigation bar above to access all admin features.
          </p>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div>
          <img
            src={serviceImg}
            alt="service"
            style={{
              maxWidth: "40vw",
              width: "100%",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ----------- REUSABLE NAV BUTTON COMPONENT ----------- */
function NavBtn({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      style={{
        color: "white",
        padding: "8px 14px",
        background: "#062f56ff",
        borderRadius: "5px",
        textDecoration: "none",
        fontSize: "14px",
      }}
    >
      {label}
    </Link>
  );
}
