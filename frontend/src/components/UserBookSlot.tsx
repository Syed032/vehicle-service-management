import React, { useEffect, useState } from "react";
import { getMyVehicles } from "../services/vehicleService";
import { bookSlotByDate } from "../services/bookingService";
import { useNavigate } from "react-router-dom";

const UserBookSlot: React.FC = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let role: string | null = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    } catch (error) {
      localStorage.clear();
      navigate("/");
    }
  } else {
    navigate("/");
  }

  const [vehicles, setVehicles] = useState<any[]>([]);
  const [vehicleId, setVehicleId] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (role !== "ROLE_USER") {
      alert("Please login with a user account to book service.");
      navigate("/");
      return;
    }

    getMyVehicles()
      .then((res) => setVehicles(res.data || []))
      .catch((err) => {
        const errorMsg =
          err.response?.data || "Failed to load vehicles";
        alert(errorMsg);
      });

  }, [role, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!vehicleId) {
      setMessage("Please choose your vehicle.");
      return;
    }

    if (!date) {
      setMessage("Please choose a date.");
      return;
    }

    try {
      const res = await bookSlotByDate(Number(vehicleId), date);
      setMessage(res.data);

    } catch (err: any) {
      const errorMsg =
        err.response?.data || "Booking failed. Try again.";
      setMessage(errorMsg);
    }
  };

  return (
    <div
      className="card"
      style={{ maxWidth: 600, margin: "40px auto", padding: 24 }}
    >
      <h2 style={{ marginBottom: 12 }}>Book Service Slot</h2>

      {message && (
        <p
          style={{
            marginBottom: 12,
            color: message.toLowerCase().includes("confirmed")
              ? "green"
              : "red",
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label style={{ marginTop: 8 }}>Select Your Vehicle</label>
        <select
          value={vehicleId}
          onChange={(e) => setVehicleId(e.target.value)}
          style={{ marginBottom: 10, width: "100%" }}
        >
          <option value="">-- Choose Vehicle --</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.brand} {v.model} ({v.registrationNumber})
            </option>
          ))}
        </select>

        <label style={{ marginTop: 8 }}>Select Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ marginBottom: 12, width: "100%" }}
          required
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            backgroundColor: "#0066ff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Book Slot
        </button>
      </form>
    </div>
  );
};

export default UserBookSlot;
