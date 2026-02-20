import api from "./api";
import { ServiceHistory } from "../types/ServiceHistory";

/* ================================
   USER APIs
================================ */

// USER → Get my history
export const getMyHistory = () => {
  return api.get<ServiceHistory[]>("/api/user/history");
};


/* ================================
   ADMIN APIs
================================ */

// ADMIN → Get all history
export const getAllHistory = () => {
  return api.get<ServiceHistory[]>("/api/admin/history");
};
