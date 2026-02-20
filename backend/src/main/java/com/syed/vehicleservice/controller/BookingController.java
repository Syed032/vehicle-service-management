package com.syed.vehicleservice.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.syed.vehicleservice.dao.*;
import com.syed.vehicleservice.entity.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class BookingController {

    @Autowired private BookingDao bookingDao;
    @Autowired private SlotDao slotDao;
    @Autowired private UserDao userDao;
    @Autowired private VehicleDao vehicleDao;
    @Autowired private ServiceHistoryDao historyDao;
    @Autowired private MechanicAvailabilityDao availabilityDao;

    private static final int MAX_PER_MECHANIC = 3;

    // ================= USER BOOK SLOT ========================

    @PostMapping("/user/book-slot")
    public String addBooking(
            @RequestParam int vehicleId,
            @RequestParam String date,
            Authentication authentication) {

        String email = authentication.getName();
        User user = userDao.getUserByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        LocalDate bookingDate;
        try {
            bookingDate = LocalDate.parse(date);
        } catch (Exception e) {
            throw new RuntimeException("Invalid date format. Use yyyy-MM-dd");
        }

        Vehicle vehicle = vehicleDao.getVehicleById(vehicleId);

        if (vehicle == null) {
            throw new RuntimeException("Vehicle not found");
        }

        // SECURITY CHECK
        if (vehicle.getUser().getId() != user.getId()) {
            throw new RuntimeException("You cannot book for this vehicle");
        }

        List<MechanicAvailability> available =
                availabilityDao.getByDate(bookingDate);

        if (available.isEmpty()) {
            throw new RuntimeException("No mechanics available for " + bookingDate);
        }

        int totalBookings =
                bookingDao.countBookingsByDate(bookingDate);

        int maxBookings =
                available.size() * MAX_PER_MECHANIC;

        if (totalBookings >= maxBookings) {
            throw new RuntimeException("All slots are full for " + bookingDate);
        }

        int index = totalBookings % available.size();
        Mechanic assignedMechanic =
                available.get(index).getMechanic();

        ServiceSlot slot = slotDao.getSlotByDate(bookingDate);
        if (slot == null) {
            slot = new ServiceSlot();
            slot.setSlotDate(bookingDate);
            slotDao.addSlot(slot);
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setVehicle(vehicle);
        booking.setSlot(slot);
        booking.setMechanic(assignedMechanic.getName());
        booking.setStatus("BOOKED");

        bookingDao.addBooking(booking);

        return "Booking confirmed for " + bookingDate +
               " with " + assignedMechanic.getName();
    }

    // ================= USER VIEW BOOKINGS ====================

    @GetMapping("/user/bookings")
    public List<Booking> getMyBookings(Authentication authentication) {

        String email = authentication.getName();
        User user = userDao.getUserByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return bookingDao.getBookingsByUser(user.getId());
    }

    // ================= ADMIN VIEW ALL ========================

    @GetMapping("/admin/bookings")
    public List<Booking> getAllBookings() {
        return bookingDao.getAllBookings();
    }

    // ================= ADMIN UPDATE STATUS ===================

    @PutMapping("/admin/update-status")
    public String updateStatus(
            @RequestParam int bookingId,
            @RequestParam String status) {

        Booking booking = bookingDao.getBookingById(bookingId);

        if (booking == null) {
            throw new RuntimeException("Booking not found");
        }

        booking.setStatus(status);
        bookingDao.updateBooking(booking);

        if ("COMPLETED".equals(status)) {

            ServiceHistory history = new ServiceHistory();
            history.setBooking(booking);
            history.setUser(booking.getUser());
            history.setVehicle(booking.getVehicle());
            history.setSlot(booking.getSlot());
            history.setServiceDate(LocalDateTime.now());
            history.setStatus("COMPLETED");
            history.setDetails("Service completed successfully");

            historyDao.addHistory(history);
        }

        return "Status updated!";
    }
}
