package com.syed.vehicleservice.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.syed.vehicleservice.dao.InvoiceDao;
import com.syed.vehicleservice.entity.Invoice;

@Repository
@Transactional
public class InvoiceDaoImpl implements InvoiceDao {

    @Autowired
    private SessionFactory sessionFactory;

    private org.hibernate.Session session() {
        return sessionFactory.getCurrentSession();
    }

    @Override
    public void saveInvoice(Invoice invoice) {
        session().save(invoice);
    }

    @Override
    public Invoice getInvoiceById(int id) {
        return session().get(Invoice.class, id);
    }

    @Override
    public List<Invoice> getInvoicesByUser(int userId) {
        return session()
                .createQuery("FROM Invoice i LEFT JOIN FETCH i.vehicle v LEFT JOIN FETCH i.user u WHERE i.user.id = :uid", Invoice.class)
                .setParameter("uid", userId)
                .list();
    }

    @Override
    public void updateInvoice(Invoice invoice) {
        session().update(invoice);
    }

    @Override
    public Invoice getInvoiceByBookingId(int bookingId) {
        return session()
                .createQuery("FROM Invoice i WHERE i.booking.id = :bid", Invoice.class)
                .setParameter("bid", bookingId)
                .uniqueResult();
    }

    @Override
    public List<Invoice> getAllInvoices() {
        return session().createQuery("FROM Invoice", Invoice.class).list();
    }
}
