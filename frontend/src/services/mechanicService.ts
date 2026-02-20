import api from "./api";

/* ================================
   ADMIN APIs ONLY
================================ */

// ADMIN → Get all mechanics
export const getAllMechanics = () => {
  return api.get("/api/admin/mechanic/all");
};

// ADMIN → Add mechanic
export const addMechanic = (name: string) => {
  return api.post("/api/admin/mechanic/add", null, {
    params: { name },
  });
};

// ADMIN → Delete mechanic
export const deleteMechanic = (id: number) => {
  return api.delete(`/api/admin/mechanic/delete/${id}`);
};

// ADMIN → Mark mechanic available
export const markMechanicAvailable = (
  mechanicId: number,
  date: string
) => {
  return api.post("/api/admin/availability/add", null, {
    params: { mechanicId, date },
  });
};

// ADMIN → Get assignments by date
export const getAssignments = (date: string) => {
  return api.get(`/api/admin/availability/assignments/${date}`);
};

// ADMIN → Get available mechanics by date
export const getAvailableByDate = (date: string) => {
  return api.get(`/api/admin/availability/date/${date}`);
};
