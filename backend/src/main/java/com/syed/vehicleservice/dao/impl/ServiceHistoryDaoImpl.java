package com.syed.vehicleservice.dao.impl;

import java.util.List;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.syed.vehicleservice.dao.ServiceHistoryDao;
import com.syed.vehicleservice.entity.ServiceHistory;

@Repository
@Transactional
public class ServiceHistoryDaoImpl implements ServiceHistoryDao {

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public void addHistory(ServiceHistory history) {
        sessionFactory.getCurrentSession().save(history);
    }

    @Override
    public List<ServiceHistory> getAllHistory() {
        return sessionFactory.getCurrentSession()
                .createQuery("FROM ServiceHistory", ServiceHistory.class)
                .list();
    }
    
    @Override
    public List<ServiceHistory> getHistoryByUserId(int userId) {

        return sessionFactory.getCurrentSession()
                .createQuery(
                    "FROM ServiceHistory h WHERE h.user.id = :uid",
                    ServiceHistory.class
                )
                .setParameter("uid", userId)
                .list();
    }

}
