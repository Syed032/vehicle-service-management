package com.syed.vehicleservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.syed.vehicleservice.dao.VehicleDao;
import com.syed.vehicleservice.dao.UserDao;
import com.syed.vehicleservice.entity.Vehicle;
import com.syed.vehicleservice.entity.User;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class VehicleController {

    @Autowired
    private VehicleDao vehicleDao;

    @Autowired
    private UserDao userDao;

    // =====================================
    // USER: Add vehicle (ONLY FOR HIMSELF)
    // =====================================
    @PreAuthorize("hasRole('USER')")
    @PostMapping("/user/vehicle/add")
    public String addVehicle(@RequestBody Vehicle vehicle) {

        if (vehicle.getBrand() == null || vehicle.getBrand().trim().isEmpty()
                || vehicle.getModel() == null || vehicle.getModel().trim().isEmpty()
                || vehicle.getRegistrationNumber() == null || vehicle.getRegistrationNumber().trim().isEmpty()) {
            throw new RuntimeException("All vehicle fields are required");
        }

        String email =
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getName();

        User user = userDao.getUserByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        vehicle.setUser(user);

        vehicleDao.saveVehicle(vehicle);

        return "Vehicle added successfully!";
    }

    // =====================================
    // USER: View MY vehicles
    // =====================================
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user/vehicles")
    public List<Vehicle> getMyVehicles() {

        String email =
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getName();

        User user = userDao.getUserByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return vehicleDao.getVehiclesByUserId(user.getId());
    }

    // =====================================
    // ADMIN: View all vehicles
    // =====================================
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/vehicles")
    public List<Vehicle> getAllVehicles() {
        return vehicleDao.getAllVehicles();
    }

    // =====================================
    // ADMIN: Get vehicle by ID
    // =====================================
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin/vehicle/{id}")
    public Vehicle getVehicleById(@PathVariable int id) {

        Vehicle vehicle = vehicleDao.getVehicleById(id);

        if (vehicle == null) {
            throw new RuntimeException("Vehicle not found");
        }

        return vehicle;
    }
}
