package com.syed.vehicleservice.dao.impl;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.syed.vehicleservice.dao.SlotDao;
import com.syed.vehicleservice.entity.ServiceSlot;

@Repository
@Transactional
public class SlotDaoImpl implements SlotDao {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public void addSlot(ServiceSlot slot) {
        sessionFactory.getCurrentSession().save(slot);
    }

    @Override
    public List<ServiceSlot> getAllSlots() {
        return sessionFactory.getCurrentSession()
                .createQuery("FROM ServiceSlot", ServiceSlot.class)
                .list();
    }

    @Override
    public ServiceSlot getSlotById(int id) {
        return sessionFactory.getCurrentSession().get(ServiceSlot.class, id);
    }

    @Override
    public void updateSlot(ServiceSlot slot) {
        sessionFactory.getCurrentSession().update(slot);
    }

    @Override
    public List<ServiceSlot> getAvailableSlots() {
        return sessionFactory.getCurrentSession()
                .createQuery("FROM ServiceSlot WHERE booked = false", ServiceSlot.class)
                .list();
    }

    // ===============================
    // NEW: Find a slot by its date (unique per day in this design)
    // Returns null if no slot exists for that date
    // ===============================
    @Override
    public ServiceSlot getSlotByDate(LocalDate date) {
        return sessionFactory.getCurrentSession()
                .createQuery("FROM ServiceSlot WHERE slotDate = :date", ServiceSlot.class)
                .setParameter("date", date)
                .uniqueResult();
    }
}
