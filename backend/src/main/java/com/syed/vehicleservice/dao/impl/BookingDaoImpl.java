package com.syed.vehicleservice.dao.impl;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.syed.vehicleservice.dao.BookingDao;
import com.syed.vehicleservice.entity.Booking;
import com.syed.vehicleservice.entity.ServiceSlot;

@Repository
@Transactional
public class BookingDaoImpl implements BookingDao {

	@Autowired
	private SessionFactory sessionFactory;

	@Override
	public void addBooking(Booking booking) {
		sessionFactory.getCurrentSession().save(booking);
	}

	@Override
	public void updateBooking(Booking booking) {
		sessionFactory.getCurrentSession().update(booking);
	}

	@Override
	public Booking getBookingById(int id) {
		return sessionFactory.getCurrentSession().get(Booking.class, id);
	}

	@Override
	public List<Booking> getBookingsByUser(int userId) {
		return sessionFactory.getCurrentSession().createQuery("FROM Booking WHERE user.id = :uid", Booking.class)
				.setParameter("uid", userId).list();
	}

	@Override
	public List<Booking> getAllBookings() {
		return sessionFactory.getCurrentSession().createQuery("FROM Booking", Booking.class).list();
	}

	
	@Override
	public int countBookingsByDate(LocalDate date) {
		Long count = sessionFactory.getCurrentSession()
				.createQuery("SELECT COUNT(b) FROM Booking b WHERE b.slot.slotDate = :date", Long.class)
				.setParameter("date", date).uniqueResult();
		return count == null ? 0 : count.intValue();
	}

	
	@Override
	public int countBookingsByDateAndMechanic(LocalDate date, String mechanic) {
		Long count = sessionFactory.getCurrentSession()
				.createQuery("SELECT COUNT(b) FROM Booking b WHERE b.slot.slotDate = :date AND b.mechanic = :mech",
						Long.class)
				.setParameter("date", date).setParameter("mech", mechanic).uniqueResult();
		return count == null ? 0 : count.intValue();
	}

	
	@Override
	public List<Booking> getBookingsByDate(LocalDate date) {
		return sessionFactory.getCurrentSession()
				.createQuery("FROM Booking b WHERE b.slot.slotDate = :date", Booking.class).setParameter("date", date)
				.list();
	}

	@Override
	public List<Booking> getBookingsByMechanicAndDate(String mechanic, LocalDate date) {
		return sessionFactory.getCurrentSession()
				.createQuery("from Booking b where b.mechanic = :mech and b.slot.slotDate = :date", Booking.class)
				.setParameter("mech", mechanic).setParameter("date", date).list();
	}

}
