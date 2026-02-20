package com.syed.vehicleservice.dao;

import java.time.LocalDate;
import java.util.List;
import com.syed.vehicleservice.entity.ServiceSlot;

public interface SlotDao {
	void addSlot(ServiceSlot slot);

	List<ServiceSlot> getAllSlots();

	ServiceSlot getSlotById(int id);

	void updateSlot(ServiceSlot slot);

	List<ServiceSlot> getAvailableSlots();

	// NEW: return a ServiceSlot for a specific date (or null if none)
	ServiceSlot getSlotByDate(LocalDate date);
}
