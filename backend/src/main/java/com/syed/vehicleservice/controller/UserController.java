package com.syed.vehicleservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.syed.vehicleservice.dao.UserDao;
import com.syed.vehicleservice.entity.User;

@RestController
@CrossOrigin(origins="https://localhost:3000")
@RequestMapping("/api")
public class UserController {
	
	@Autowired
	UserDao userDao;
	
	@GetMapping("/user/profile")
	public UserProfileDto getMyProfile(Authentication authenication)
	{
		String email=authenication.getName();
		
		User user=userDao.getUserByEmail(email);
		
		if(user==null)
		{
			throw new RuntimeException("No profile found with this email");
		}
		
		UserProfileDto dto=new UserProfileDto();
		dto.setName(user.getName());
		dto.setEmail(user.getEmail());
		dto.setPhone(user.getMobile());
		dto.setId(user.getId());
		dto.setRole(user.getRole());
		
		return dto;
	}
	
	@GetMapping("/admin/profile")
	public UserProfileDto getAdminProfile(Authentication authenication)
	{
		String email=authenication.getName();
		
		User user=userDao.getUserByEmail(email);
		
		if(user==null)
		{
			throw new RuntimeException("No profile found with this email");
		}
		
		UserProfileDto dto=new UserProfileDto();
		dto.setName(user.getName());
		dto.setEmail(user.getEmail());
		dto.setPhone(user.getMobile());
		dto.setId(user.getId());
		dto.setRole(user.getRole());
	
		
		return dto;
	}
	
	public static class UserProfileDto
	{
		private int id;
		private String name;
		private String email;
		private String phone;
		private String role;
		
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getRole() {
			return role;
		}
		public void setRole(String role) {
			this.role = role;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getPhone() {
			return phone;
		}
		public void setPhone(String phone) {
			this.phone = phone;
		}
		
		
	}

}
