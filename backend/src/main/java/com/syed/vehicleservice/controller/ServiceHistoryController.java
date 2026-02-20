package com.syed.vehicleservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.syed.vehicleservice.dao.ServiceHistoryDao;
import com.syed.vehicleservice.dao.UserDao;
import com.syed.vehicleservice.entity.ServiceHistory;
import com.syed.vehicleservice.entity.User;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ServiceHistoryController {

    @Autowired
    private ServiceHistoryDao historyDao;

    @Autowired
    private UserDao userDao;

    // ================= USER HISTORY ======================

    @GetMapping("/user/history")
    public List<ServiceHistory> getMyHistory(Authentication authentication) {

        String email = authentication.getName();
        User user = userDao.getUserByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return historyDao.getHistoryByUserId(user.getId());
    }

    // ================= ADMIN HISTORY =====================

    @GetMapping("/admin/history")
    public List<ServiceHistory> getAllHistory() {

        return historyDao.getAllHistory();
    }
}
