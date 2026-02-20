package com.syed.vehicleservice.dao;

import java.time.LocalDate;
import java.util.List;

import com.syed.vehicleservice.entity.MechanicAvailability;

public interface MechanicAvailabilityDao {

    void save(MechanicAvailability availability);

    List<MechanicAvailability> getByDate(LocalDate date);
}
