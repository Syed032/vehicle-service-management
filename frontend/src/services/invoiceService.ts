import api from "./api";

/* ================================
   USER APIs
================================ */

// USER → Get my invoices
export const getMyInvoices = () => {
  return api.get("/api/invoice/my");
};

// USER → Pay invoice (only his)
export const payInvoice = (invoiceId: number, mode: "UPI" | "CASH") => {
  return api.put(`/api/invoice/pay/${invoiceId}?mode=${mode}`);
};


/* ================================
   ADMIN APIs
================================ */

// ADMIN → Generate invoice
export const generateInvoice = (payload: any) => {
  return api.post("/api/invoice/generate", payload);
};

// ADMIN → Get all invoices
export const getAllInvoices = () => {
  return api.get("/api/invoice/all");
};

// ADMIN → Get invoice by booking
export const getInvoiceByBooking = (bookingId: number) => {
  return api.get(`/api/invoice/by-booking/${bookingId}`);
};
