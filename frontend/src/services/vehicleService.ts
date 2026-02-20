import api from "./api";
import { Vehicle } from "../types/Vehicle";

/* ================================
   USER APIs
================================ */

// USER → Add vehicle (no userId!)
export const addVehicle = (vehicle: Vehicle) => {
  return api.post("/api/user/vehicle/add", {
    brand: vehicle.brand,
    model: vehicle.model,
    registrationNumber: vehicle.vehicleNumber
  });
};

// USER → Get my vehicles
export const getMyVehicles = () => {
  return api.get<Vehicle[]>("/api/user/vehicles");
};


/* ================================
   ADMIN APIs
================================ */

// ADMIN → Get all vehicles
export const getAllVehicles = () => {
  return api.get<Vehicle[]>("/api/admin/vehicles");
};

// ADMIN → Get vehicle by ID
export const getVehicleById = (id: number) => {
  return api.get<Vehicle>(`/api/admin/vehicle/${id}`);
};
