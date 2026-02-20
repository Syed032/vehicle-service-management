import api from "./api";
import { User } from "../types/User";

/* ================================
   AUTH APIs
================================ */

// Register
export const registerUser = (user: User) => {
  return api.post("/api/auth/register", user);
};

// Login
export const loginUser = (credentials: {
  email: string;
  password: string;
}) => {
  return api.post("/api/auth/login", credentials);
};



// export const getUserProfile =()=>{
//   return api.get(`/api/user/profile`);
// }


/* ================================
   ADMIN APIs
================================ */

// ADMIN → Get all users
export const getAllUsers = () => {
  return api.get("/api/admin/users");
};

// ADMIN → Get user by ID
export const getUserById = (id: number) => {
  return api.get(`/api/admin/user/${id}`);
};
