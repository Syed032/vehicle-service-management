package com.syed.vehicleservice.controller;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.syed.vehicleservice.dao.BookingDao;
import com.syed.vehicleservice.dao.MechanicAvailabilityDao;
import com.syed.vehicleservice.dao.MechanicDao;
import com.syed.vehicleservice.entity.Booking;
import com.syed.vehicleservice.entity.Mechanic;
import com.syed.vehicleservice.entity.MechanicAvailability;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admin/availability")
@PreAuthorize("hasRole('ADMIN')")
public class MechanicAvailabilityController {

    @Autowired
    private MechanicAvailabilityDao availabilityDao;

    @Autowired
    private MechanicDao mechanicDao;

    @Autowired
    private BookingDao bookingDao;

    // =========================================
    // ADMIN: Mark mechanic available for date
    // =========================================
    @PostMapping("/add")
    public String markAvailable(
            @RequestParam int mechanicId,
            @RequestParam String date) {

        Mechanic mechanic = mechanicDao.getById(mechanicId);
        if (mechanic == null) {
            throw new RuntimeException("Mechanic not found");
        }

        LocalDate parsedDate;
        try {
            parsedDate = LocalDate.parse(date);
        } catch (Exception e) {
            throw new RuntimeException("Invalid date format. Use yyyy-MM-dd");
        }

        MechanicAvailability availability = new MechanicAvailability();
        availability.setDate(parsedDate);
        availability.setMechanic(mechanic);

        availabilityDao.save(availability);

        return "Mechanic marked available";
    }

    // =========================================
    // ADMIN: Get available mechanics for date
    // =========================================
    @GetMapping("/date/{date}")
    public List<MechanicAvailability> getAvailable(@PathVariable String date) {

        LocalDate parsedDate;
        try {
            parsedDate = LocalDate.parse(date);
        } catch (Exception e) {
            throw new RuntimeException("Invalid date format. Use yyyy-MM-dd");
        }

        return availabilityDao.getByDate(parsedDate);
    }

    // =========================================
    // ADMIN: Get booking assignments by date
    // =========================================
    @GetMapping("/assignments/{date}")
    public Map<String, List<Booking>> getAssignments(@PathVariable String date) {

        LocalDate parsedDate;
        try {
            parsedDate = LocalDate.parse(date);
        } catch (Exception e) {
            throw new RuntimeException("Invalid date format. Use yyyy-MM-dd");
        }

        Map<String, List<Booking>> map = new HashMap<>();

        List<Mechanic> mechanics = mechanicDao.getAll();

        for (Mechanic m : mechanics) {
            List<Booking> bookings =
                    bookingDao.getBookingsByMechanicAndDate(m.getName(), parsedDate);
            map.put(m.getName(), bookings);
        }

        return map;
    }
}
