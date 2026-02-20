package com.syed.vehicleservice.dao;

import java.util.List;
import com.syed.vehicleservice.entity.Mechanic;

public interface MechanicDao {
    void save(Mechanic mechanic);
    void delete(int id);
    Mechanic getById(int id);
    List<Mechanic> getAll();
}
