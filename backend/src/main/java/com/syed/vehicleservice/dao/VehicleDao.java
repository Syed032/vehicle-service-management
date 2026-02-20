package com.syed.vehicleservice.dao;

import java.util.List;
import com.syed.vehicleservice.entity.Vehicle;

public interface VehicleDao {
	void saveVehicle(Vehicle vehicle);

	List<Vehicle> getAllVehicles();

	Vehicle getVehicleById(int id);

	List<Vehicle> getVehiclesByUserId(int userId); // ⭐ required
}
