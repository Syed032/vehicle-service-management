import React, { useState, useEffect } from "react";
import { addVehicle } from "../services/vehicleService";
import { useNavigate } from "react-router-dom";

const AddVehicle: React.FC = () => {
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

  const [vehicle, setVehicle] = useState({
    brand: "",
    model: "",
    vehicleNumber: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (role !== "ROLE_USER") {
      alert("Please login as a user.");
      navigate("/");
    }
  }, [role, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      await addVehicle(vehicle);

      setMessage("Vehicle added successfully!");

      setVehicle({
        brand: "",
        model: "",
        vehicleNumber: "",
      });

    } catch (err: any) {
      const errorMsg =
        err.response?.data || "Failed to add vehicle";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="card" style={{ maxWidth: 500, margin: "40px auto" }}>
      <h2 style={{ marginBottom: 20 }}>Add New Vehicle</h2>

      {message && (
        <p
          style={{
            marginBottom: 15,
            color: message.toLowerCase().includes("success")
              ? "green"
              : "red",
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="brand"
          value={vehicle.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
        />

        <input
          type="text"
          name="model"
          value={vehicle.model}
          onChange={handleChange}
          placeholder="Model"
          required
        />

        <input
          type="text"
          name="vehicleNumber"
          value={vehicle.vehicleNumber}
          onChange={handleChange}
          placeholder="Vehicle Number"
          required
        />

        <button type="submit" className="btn-primary">
          Add Vehicle
        </button>
      </form>
    </div>
  );
};

export default AddVehicle;
