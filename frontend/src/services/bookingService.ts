import api from "./api";

/* ================================
   USER APIs
================================ */

// USER → Book slot by date
export const bookSlotByDate = (vehicleId: number, date: string) => {
  return api.post(`/api/user/book-slot?vehicleId=${vehicleId}&date=${date}`);
};

// USER → Get my bookings
export const getMyBookings = () => {
  return api.get(`/api/user/bookings`);
};


/* ================================
   ADMIN APIs
================================ */

// ADMIN → Get all bookings
export const getAllBookings = () => {
  return api.get(`/api/admin/bookings`);
};

// ADMIN → Update booking status
export const updateBookingStatus = (bookingId: number, status: string) => {
  return api.put(
    `/api/admin/update-status?bookingId=${bookingId}&status=${status}`
  );
};
