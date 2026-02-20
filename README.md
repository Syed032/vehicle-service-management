🚗 Vehicle Service Management System
📌 Project Overview

This is a full-stack Vehicle Service Management System built using Spring MVC and React. The system allows users to book vehicle service slots and allows administrators to manage bookings, mechanics, service history, and invoices securely using JWT-based authentication.

The application follows a stateless authentication architecture using Spring Security and JSON Web Tokens (JWT).

🛠 Tech Stack
🔹 Backend
Spring MVC
Spring Security
JWT (JJWT library)
Hibernate
MySQL
BCrypt Password Encoder
REST APIs

🔹 Frontend
React (TypeScript)
Axios
React Router
LocalStorage (JWT storage)

🔹 Tools
Postman (API testing)
GitHub (Version control)
🏗 Architecture
The project follows layered architecture:
Controller → Service → DAO → Database

Security Layer:
JwtFilter → SecurityContext → Role-based Authorization

🔐 Security Implementation
The system uses stateless JWT authentication.

🔹 Login Flow
User enters email and password.
Backend authenticates using:
AuthenticationManager
DaoAuthenticationProvider
CustomUserDetailsService
Password verified using BCrypt.
JWT token generated using JwtUtil.
Token sent to frontend.
Frontend stores token in localStorage.
Token sent in Authorization header for every request.

Example header:
Authorization: Bearer <token>
🔹 JWT Contains:
User ID
Email
Role
Issue time
Expiry time
Token is signed using HS256 algorithm and secret key.

🔹 JwtFilter
Runs for every request:
Extracts token
Validates signature
Checks expiry
Extracts role
Sets Authentication in SecurityContext

🔹 Role-Based Access Control
Configured in SecurityConfig:
/api/auth/** → Public
/api/admin/** → ROLE_ADMIN
/api/user/** → ROLE_USER
All others → Authenticated

🔹 Exception Handling
Implemented using:
@ControllerAdvice (GlobalExceptionHandler)
CustomAuthenticationEntryPoint → Handles 401
CustomAccessDeniedHandler → Handles 403
Status Codes:
401 → Unauthorized
403 → Forbidden
400 → Bad Request
500 → Internal Server Error

👤 User Features
Register

Login
Add vehicle
Book service slot
View bookings
View service history
View invoices
Pay invoice (UPI)

👨‍💼 Admin Features
View all bookings
Update booking status
Generate invoice
Manage mechanics
Set mechanic availability
View assignments
View service history

📅 Booking Flow
User selects vehicle and date.
Backend checks:
Vehicle belongs to user
Mechanic availability
Slot capacity
Assigns mechanic automatically.
Creates booking.

💳 Invoice Flow
Admin marks booking as COMPLETED.
Admin generates invoice.
Invoice linked to user and vehicle.
User pays via UPI.
Payment status updated.

🧪 Postman Testing Flow
🔹 1. Register
POST /api/auth/register

🔹 2. Login
POST /api/auth/login
Copy JWT token from response.

🔹 3. Protected APIs
Add Header:
Authorization: Bearer <token>

Test:
User APIs
Admin APIs
Wrong role access (should return 403)
Missing token (should return 401)

🌍 CORS Handling
Preflight OPTIONS requests are permitted to allow frontend running on different port.

🔑 Password Security
Passwords stored encrypted using BCrypt.
BCrypt uses salting and is resistant to brute-force attacks.
Password comparison done using passwordEncoder.matches().

📦 Deployment Architecture
The system is currently configured as:
React frontend running on port 3000
Spring MVC backend running on port 8085
JWT ensures stateless authentication.

🎯 Key Concepts Implemented
Stateless Authentication
JWT Signature Verification
Role-based Authorization
Custom Security Filters
Global Exception Handling
BCrypt Password Hashing
CORS Configuration
DAO Authentication Provider
Spring Security Filter Chain
