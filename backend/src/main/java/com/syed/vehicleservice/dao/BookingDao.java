package com.syed.vehicleservice.dao;

import java.time.LocalDate;
import java.util.List;
import com.syed.vehicleservice.entity.Booking;

public interface BookingDao {
    void addBooking(Booking booking);

    void updateBooking(Booking booking);

    Booking getBookingById(int id);

    List<Booking> getBookingsByUser(int userId);

    List<Booking> getAllBookings();

    int countBookingsByDate(LocalDate date);

    int countBookingsByDateAndMechanic(LocalDate date, String mechanic);

    List<Booking> getBookingsByDate(LocalDate date);
    
    List<Booking> getBookingsByMechanicAndDate(String mechanic, LocalDate date);

    
    
}
