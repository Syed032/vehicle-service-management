package com.syed.vehicleservice.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.syed.vehicleservice.dao.MechanicDao;
import com.syed.vehicleservice.entity.Mechanic;

@Repository
@Transactional
public class MechanicDaoImpl implements MechanicDao {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public void save(Mechanic mechanic) {
        sessionFactory.getCurrentSession().save(mechanic);
    }

    @Override
    public void delete(int id) {
        Mechanic m = getById(id);
        if (m != null) {
            sessionFactory.getCurrentSession().delete(m);
        }
    }

    @Override
    public Mechanic getById(int id) {
        return sessionFactory.getCurrentSession().get(Mechanic.class, id);
    }

    @Override
    public List<Mechanic> getAll() {
        return sessionFactory
            .getCurrentSession()
            .createQuery("from Mechanic", Mechanic.class)
            .list();
    }
}
