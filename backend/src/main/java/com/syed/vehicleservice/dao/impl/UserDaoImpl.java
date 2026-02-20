package com.syed.vehicleservice.dao.impl;

import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.syed.vehicleservice.dao.UserDao;
import com.syed.vehicleservice.entity.User;

@Repository
@Transactional
public class UserDaoImpl implements UserDao {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void saveUser(User user) {
		sessionFactory.getCurrentSession().save(user);
	}

	@Override
	public List<User> getAllUsers() {
		return sessionFactory.getCurrentSession().createQuery("from User", User.class).list();
	}

	@Override
	public User getUserById(int id) {
		return sessionFactory.getCurrentSession().get(User.class, id);
	}

	@Override
	public User getUserByEmail(String email) {
		return sessionFactory.getCurrentSession().createQuery("from User where email = :email", User.class)
				.setParameter("email", email).uniqueResult();
	}
}
