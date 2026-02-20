package com.syed.vehicleservice.dao;

import java.util.List;
import com.syed.vehicleservice.entity.User;

public interface UserDao {

	void saveUser(User user);

	List<User> getAllUsers();

	User getUserById(int id);

	User getUserByEmail(String email);
	


}
