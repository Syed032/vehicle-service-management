import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";

import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";

import UserBookSlot from "./components/UserBookSlot";
import AddVehicle from "./components/AddVehicle";

import BookingList from "./components/BookingList";
import ServiceHistory from "./components/ServiceHistory";
import UserInvoices from "./components/UserInvoices";

import RoleProtectedRoute from "./components/RoleProtectedRoute";
import AdminMechanics from "./components/AdminMechanics";
import UserProfile from "./components/UserProfile";
import AdminProfile from "./components/AdminProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ---------- PUBLIC ---------- */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ---------- DASHBOARDS ---------- */}
        <Route
          path="/user-dashboard"
          element={
            <RoleProtectedRoute allowedRole="ROLE_USER">
              <UserDashboard />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <RoleProtectedRoute allowedRole="ROLE_ADMIN">
              <AdminDashboard />
            </RoleProtectedRoute>
          }
        />

        {/* ---------- USER FEATURES ---------- */}
        <Route
          path="/user/book-slot"
          element={
            <RoleProtectedRoute allowedRole="ROLE_USER">
              <UserBookSlot />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/user/add-vehicle"
          element={
            <RoleProtectedRoute allowedRole="ROLE_USER">
              <AddVehicle />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/user/bookings"
          element={
            <RoleProtectedRoute allowedRole="ROLE_USER">
              <BookingList />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/user/history"
          element={
            <RoleProtectedRoute allowedRole="ROLE_USER">
              <ServiceHistory />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/user/invoices"
          element={
            <RoleProtectedRoute allowedRole="ROLE_USER">
              <UserInvoices />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/user/profile"
          element={
            <RoleProtectedRoute allowedRole="ROLE_USER">
              <UserProfile />
            </RoleProtectedRoute>
          }
        />

        {/* ---------- ADMIN FEATURES ---------- */}
        <Route
          path="/admin/bookings"
          element={
            <RoleProtectedRoute allowedRole="ROLE_ADMIN">
              <BookingList />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/history"
          element={
            <RoleProtectedRoute allowedRole="ROLE_ADMIN">
              <ServiceHistory />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/mechanics"
          element={
            <RoleProtectedRoute allowedRole="ROLE_ADMIN">
              <AdminMechanics />
            </RoleProtectedRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <RoleProtectedRoute allowedRole="ROLE_ADMIN">
              <AdminProfile />
            </RoleProtectedRoute>
          }
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
