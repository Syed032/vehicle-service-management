package com.syed.vehicleservice.dao.impl;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.syed.vehicleservice.dao.VehicleDao;
import com.syed.vehicleservice.entity.Vehicle;

@Repository
@Transactional
public class VehicleDaoImpl implements VehicleDao {

    @Autowired
    private SessionFactory sessionFactory;

    private Session getSession() {
        return sessionFactory.getCurrentSession();
    }

    @Override
    public void saveVehicle(Vehicle vehicle) {
        getSession().save(vehicle);
    }

    @Override
    public List<Vehicle> getAllVehicles() {
        // ⭐ EAGER LOAD user object
        return getSession()
                .createQuery("SELECT v FROM Vehicle v JOIN FETCH v.user", Vehicle.class)
                .list();
    }

    @Override
    public Vehicle getVehicleById(int id) {
        return getSession().get(Vehicle.class, id);
    }

    @Override
    public List<Vehicle> getVehiclesByUserId(int userId) {
        return getSession()
                .createQuery("FROM Vehicle v WHERE v.user.id = :userId", Vehicle.class)
                .setParameter("userId", userId)
                .list();
    }
}
