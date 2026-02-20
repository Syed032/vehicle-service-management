import React, { useEffect, useState } from "react";
import {
  getAllMechanics,
  markMechanicAvailable,
  addMechanic,
  deleteMechanic,
  getAssignments
} from "../services/mechanicService";
import { useNavigate } from "react-router-dom";

const AdminMechanics: React.FC = () => {
  const navigate = useNavigate();

  const [mechanics, setMechanics] = useState<any[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [assignments, setAssignments] = useState<any>(null);

  const loadMechanics = async () => {
    try {
      const res = await getAllMechanics();
      setMechanics(res.data || []);
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/");
      } else {
        alert(err.response?.data || "Error loading mechanics");
      }
    }
  };

  useEffect(() => {
    loadMechanics();
  }, []);

  const toggleMechanic = (id: number) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const saveAvailability = async () => {
    if (!date) {
      alert("Select date");
      return;
    }

    try {
      for (const mechId of selected) {
        await markMechanicAvailable(mechId, date);
      }

      alert("Availability saved");
      setSelected([]);

    } catch (err: any) {
      alert(err.response?.data || "Error saving availability");
    }
  };

  const handleAdd = async () => {
    if (!name.trim()) return;

    try {
      await addMechanic(name);
      setName("");
      loadMechanics();

    } catch (err: any) {
      alert(err.response?.data || "Error adding mechanic");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMechanic(id);
      loadMechanics();

    } catch (err: any) {
      alert(err.response?.data || "Error deleting mechanic");
    }
  };

  const loadAssignments = async () => {
    if (!date) {
      alert("Select date");
      return;
    }

    try {
      const res = await getAssignments(date);
      setAssignments(res.data);

    } catch (err: any) {
      alert(err.response?.data || "Error loading assignments");
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto" }}>
      <h2>Mechanic Availability</h2>

      <label>Select Date</label>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="Mechanic name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <table border={1} width="100%" cellPadding={8}>
        <thead>
          <tr>
            <th>Select</th>
            <th>Mechanic Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mechanics.map(m => (
            <tr key={m.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(m.id)}
                  onChange={() => toggleMechanic(m.id)}
                />
              </td>
              <td>{m.name}</td>
              <td>
                <button onClick={() => handleDelete(m.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={saveAvailability}
        style={{
          marginTop: 15,
          padding: "10px 20px",
          background: "#0066ff",
          color: "white",
          border: "none",
          borderRadius: 5
        }}
      >
        Save Availability
      </button>

      <hr style={{ margin: "30px 0" }} />

      <h3>Assignments for selected date</h3>
      <button onClick={loadAssignments}>Load Assignments</button>

      {assignments &&
        Object.entries(assignments).map(([mech, bookings]: any) => (
          <div key={mech}>
            <strong>{mech}</strong>
            <ul>
              {bookings.map((b: any) => (
                <li key={b.id}>
                  {b.vehicle.brand} - {b.vehicle.model}
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default AdminMechanics;
