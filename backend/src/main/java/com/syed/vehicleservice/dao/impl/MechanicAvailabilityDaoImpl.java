package com.syed.vehicleservice.dao.impl;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.syed.vehicleservice.dao.MechanicAvailabilityDao;
import com.syed.vehicleservice.entity.MechanicAvailability;

@Repository
@Transactional
public class MechanicAvailabilityDaoImpl implements MechanicAvailabilityDao {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public void save(MechanicAvailability availability) {
        sessionFactory.getCurrentSession().save(availability);
    }

    @Override
    public List<MechanicAvailability> getByDate(LocalDate date) {
        return sessionFactory.getCurrentSession()
                .createQuery(
                    "from MechanicAvailability where date = :date",
                    MechanicAvailability.class
                )
                .setParameter("date", date)
                .list();
    }
}
