package com.syed.vehicleservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.syed.vehicleservice.dao.MechanicDao;
import com.syed.vehicleservice.entity.Mechanic;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admin/mechanic")
@PreAuthorize("hasRole('ADMIN')")
public class MechanicController {

    @Autowired
    private MechanicDao mechanicDao;

    // ================================
    // ADMIN: Get all mechanics
    // ================================
    @GetMapping("/all")
    public List<Mechanic> getAll() {
        return mechanicDao.getAll();
    }

    // ================================
    // ADMIN: Add mechanic
    // ================================
    @PostMapping("/add")
    public String add(@RequestParam String name) {

        if (name == null || name.trim().isEmpty()) {
            throw new RuntimeException("Mechanic name is required");
        }

        Mechanic m = new Mechanic();
        m.setName(name.trim());

        mechanicDao.save(m);

        return "Mechanic added";
    }

    // ================================
    // ADMIN: Delete mechanic
    // ================================
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable int id) {

        Mechanic mechanic = mechanicDao.getById(id);

        if (mechanic == null) {
            throw new RuntimeException("Mechanic not found");
        }

        mechanicDao.delete(id);

        return "Mechanic deleted";
    }
}
