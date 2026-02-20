import React, { useEffect, useState } from "react";
import {
  getAllBookings,
  getMyBookings,
  updateBookingStatus,
} from "../services/bookingService";
import { generateInvoice } from "../services/invoiceService";
import { useNavigate } from "react-router-dom";

const BookingList: React.FC = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  let role: string | null = null;

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      role = payload.role;
    } catch {
      localStorage.clear();
      navigate("/");
    }
  } else {
    navigate("/");
  }

  const [bookings, setBookings] = useState<any[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<any>(null);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  const loadData = async () => {
    try {
      if (role === "ROLE_ADMIN") {
        const res = await getAllBookings();
        setBookings(res.data || []);
      } else if (role === "ROLE_USER") {
        const res = await getMyBookings();
        setBookings(res.data || []);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/");
      } else {
        alert(err.response?.data || "Error loading bookings");
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (booking: any, status: string) => {
    if (status === "COMPLETED" && role === "ROLE_ADMIN") {
      setCurrentBooking(booking);
      setDesc("");
      setAmount("");
      setModalOpen(true);
      return;
    }

    try {
      await updateBookingStatus(booking.id, status);
      alert("Status Updated!");
      loadData();
    } catch (err: any) {
      alert(err.response?.data || "Failed to update status");
    }
  };

  const handleGenerateInvoice = async () => {
    if (!currentBooking) return;

    if (!amount || isNaN(Number(amount))) {
      alert("Enter a valid amount");
      return;
    }

    const payload = {
      bookingId: currentBooking.id,
      userId: currentBooking.user?.id,
      vehicleId: currentBooking.vehicle?.id,
      description: desc,
      amount: Number(amount),
    };

    try {
      await generateInvoice(payload);
      await updateBookingStatus(currentBooking.id, "COMPLETED");

      setModalOpen(false);
      alert("Invoice generated & booking marked COMPLETED");
      loadData();

    } catch (err: any) {
      alert(err.response?.data || "Failed to generate invoice");
    }
  };

  return (
    <div>
      <h2>
        {role === "ROLE_ADMIN" ? "All Bookings" : "My Bookings"}
      </h2>

      <table
        border={1}
        cellPadding={8}
        style={{ width: "100%", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Vehicle</th>
            <th>Service Date</th>
            <th>Mechanic</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.user?.name}</td>
              <td>
                {b.vehicle?.brand} - {b.vehicle?.model}
              </td>
              <td>
                {b.slot?.slotDate
                  ? new Date(b.slot.slotDate).toLocaleDateString()
                  : "-"}
              </td>
              <td>{b.mechanic || "-"}</td>
              <td>
                {role === "ROLE_ADMIN" ? (
                  <select
                    value={b.status}
                    disabled={b.status === "COMPLETED"}
                    onChange={(e) =>
                      handleStatusChange(b, e.target.value)
                    }
                  >
                    <option value="BOOKED">BOOKED</option>
                    <option value="VEHICLE_RECEIVED">
                      VEHICLE_RECEIVED
                    </option>
                    <option value="INSPECTION">INSPECTION</option>
                    <option value="WORK_IN_PROGRESS">
                      WORK_IN_PROGRESS
                    </option>
                    <option value="READY_FOR_DELIVERY">
                      READY_FOR_DELIVERY
                    </option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                ) : (
                  b.status
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && currentBooking && (
        <div style={modalWrap}>
          <div style={modal}>
            <h3>
              Generate Invoice for Booking #{currentBooking.id}
            </h3>

            <p>
              <strong>User:</strong>{" "}
              {currentBooking.user?.name}
            </p>

            <label>Description</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={{ width: "100%", height: 80 }}
            />

            <label>Amount</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ width: "100%", padding: 8 }}
            />

            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button
                onClick={handleGenerateInvoice}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#0066ff",
                  color: "white",
                  border: "none",
                  borderRadius: 6,
                }}
              >
                Generate Invoice
              </button>
              <button
                onClick={() => setModalOpen(false)}
                style={{ padding: "8px 16px" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const modalWrap: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modal: React.CSSProperties = {
  width: 520,
  padding: 20,
  borderRadius: 8,
  background: "#fff",
  textAlign: "left",
  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
};

export default BookingList;
