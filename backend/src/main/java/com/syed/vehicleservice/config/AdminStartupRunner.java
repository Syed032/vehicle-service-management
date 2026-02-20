package com.syed.vehicleservice.config;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.syed.vehicleservice.dao.UserDao;
import com.syed.vehicleservice.entity.User;

@Component
public class AdminStartupRunner {

    @Autowired
    private UserDao userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void createDefaultAdmin() {

        User existing = userDao.getUserByEmail("admin@gmail.com");

        if (existing == null) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("admin123"));  // 🔥 FIXED
            admin.setMobile("9999999999");
            admin.setRole("ROLE_ADMIN");

            userDao.saveUser(admin);

            System.out.println("Default admin created");
        } else {
            System.out.println("Admin already exists. Skipping creation.");
        }
    }
}
