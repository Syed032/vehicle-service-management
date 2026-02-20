import React, { useEffect, useState } from "react";
import { getMyHistory, getAllHistory } from "../services/historyService";
import {
  payInvoice,
  getInvoiceByBooking,
} from "../services/invoiceService";
import { useNavigate } from "react-router-dom";

const ServiceHistory: React.FC = () => {
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

  const [history, setHistory] = useState<any[]>([]);
  const [invoiceMap, setInvoiceMap] = useState<Record<number, any>>({});

  const loadHistory = async () => {
    try {
      let res;

      if (role === "ROLE_ADMIN") {
        res = await getAllHistory();
      } else {
        res = await getMyHistory();
      }

      const data = res.data || [];
      setHistory(data);

      // Load invoices
      for (const record of data) {
        if (!record.booking?.id) continue;

        try {
          const invRes = await getInvoiceByBooking(record.booking.id);

          setInvoiceMap((prev) => ({
            ...prev,
            [record.booking.id as number]: invRes.data,
          }));

        } catch {
          // No invoice — ignore silently
        }
      }

    } catch (err: any) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate("/");
      } else {
        alert(err.response?.data || "Error loading service history");
      }
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleCashPay = async (invoiceId: number) => {
    try {
      await payInvoice(invoiceId, "CASH");
      alert("Payment done via CASH");
      loadHistory();

    } catch (err: any) {
      alert(err.response?.data || "Payment failed");
    }
  };

  return (
    <div style={{ width: "80%", margin: "40px auto" }}>
      <h2>Service History</h2>

      <table border={1} width="100%" cellPadding={8}>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Vehicle</th>
            <th>Date</th>
            <th>Details</th>
            <th>Payment Status</th>
          </tr>
        </thead>

        <tbody>
          {history.map((record) => {
            const invoice = invoiceMap[record.booking?.id];

            return (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.user?.name}</td>
                <td>
                  {record.vehicle?.brand} {record.vehicle?.model}
                </td>
                <td>
                  {new Date(record.serviceDate).toLocaleDateString()}
                </td>
                <td>{record.details}</td>
                <td>
                  {!invoice ? (
                    "No Invoice"
                  ) : invoice.status === "PAID" ? (
                    `Paid via ${invoice.paymentMode}`
                  ) : role === "ROLE_ADMIN" ? (
                    <button onClick={() => handleCashPay(invoice.id)}>
                      Cash
                    </button>
                  ) : (
                    "UNPAID"
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceHistory;
