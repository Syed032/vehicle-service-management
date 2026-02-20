import React, { useEffect, useState } from "react";
import { getMyInvoices, payInvoice } from "../services/invoiceService";
import { useNavigate } from "react-router-dom";

const UPI_ID = "garage@upi";

const UserInvoices: React.FC = () => {
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

  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    if (role !== "ROLE_USER") return;
    load();
  }, []);

  const load = async () => {
    try {
      const res = await getMyInvoices();
      setInvoices(res.data || []);

    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/");
      } else {
        alert(err.response?.data || "Failed to load invoices");
      }
    }
  };

  const handlePay = async (invId: number) => {
    try {
      await payInvoice(invId, "UPI");
      alert("Payment done via UPI");
      load();

    } catch (err: any) {
      alert(err.response?.data || "Payment failed");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "30px auto" }}>
      <h2>My Invoices & Payments</h2>

      {invoices.length === 0 && (
        <p>No invoices available.</p>
      )}

      {invoices.map((inv) => (
        <div
          key={inv.id}
          style={{
            border: "1px solid #ddd",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          <p><strong>Invoice #{inv.id}</strong></p>
          <p><strong>Vehicle:</strong> {inv.vehicle?.brand} {inv.vehicle?.model}</p>
          <p><strong>Description:</strong> {inv.description}</p>
          <p><strong>Amount:</strong> ₹{inv.amount}</p>

          {inv.status === "UNPAID" ? (
            <>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                  `upi://pay?pa=${UPI_ID}&am=${inv.amount}`
                )}`}
                alt="QR"
                style={{ width: 150 }}
              />
              <br />
              <button onClick={() => handlePay(inv.id)}>
                Pay via UPI
              </button>
            </>
          ) : (
            <div style={{ color: "green" }}>
              Paid via {inv.paymentMode}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserInvoices;
