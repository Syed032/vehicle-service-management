package com.syed.vehicleservice.controller;

import com.syed.vehicleservice.dao.UserDao;
import com.syed.vehicleservice.entity.User;
import com.syed.vehicleservice.security.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

	@Autowired
	private UserDao userDao;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtUtil jwtUtil;

	@Autowired
	private PasswordEncoder passwordEncoder;

	// ------------------ LOGIN ---------------------
	@PostMapping("/login")
	public Map<String, String> login(@RequestBody Map<String, String> loginData) {

		String email = loginData.get("email");
		String password = loginData.get("password");

		if (email == null || password == null) {
			throw new RuntimeException("Email and password are required");
		}

		try {
			// Authenticate using Spring Security
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email, password));
		} catch (BadCredentialsException ex) {
			throw new RuntimeException("Invalid email or password");
		}

		// Fetch full user from DB
		User user = userDao.getUserByEmail(email);

		if (user == null) {
			throw new RuntimeException("User not found");
		}

		// Generate JWT WITH ID
		String token = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getRole());

		Map<String, String> response = new HashMap<>();
		response.put("token", token);

		return response;
	}

	// ------------------ REGISTER ---------------------
	@PostMapping("/register")
	public String register(@RequestBody User user) {

		if (user.getEmail() == null || user.getPassword() == null) {
			throw new RuntimeException("Email and password are required");
		}

		// Check if email exists
		User existing = userDao.getUserByEmail(user.getEmail());
		if (existing != null) {
			throw new RuntimeException("Email already registered");
		}

		// Encrypt password
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		// Set role properly
		user.setRole("ROLE_USER");

		userDao.saveUser(user);

		return "SUCCESS";
	}
}
