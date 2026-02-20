package com.syed.vehicleservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.syed.vehicleservice.dao.*;
import com.syed.vehicleservice.entity.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/invoice")
public class InvoiceController {

    @Autowired
    private InvoiceDao invoiceDao;

    @Autowired
    private UserDao userDao;

    @Autowired
    private VehicleDao vehicleDao;

    @Autowired
    private BookingDao bookingDao;

    // ===============================
    // ADMIN: Generate invoice
    // ===============================
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/generate")
    public Invoice generateInvoice(@RequestBody InvoiceRequest req) {

        if (req.getUserId() == 0 || req.getVehicleId() == 0) {
            throw new RuntimeException("User ID and Vehicle ID are required");
        }

        Booking booking = null;
        if (req.getBookingId() != null) {
            booking = bookingDao.getBookingById(req.getBookingId());
            if (booking == null)
                throw new RuntimeException("Booking not found");
        }

        User user = userDao.getUserById(req.getUserId());
        if (user == null)
            throw new RuntimeException("User not found");

        Vehicle vehicle = vehicleDao.getVehicleById(req.getVehicleId());
        if (vehicle == null)
            throw new RuntimeException("Vehicle not found");

        Invoice invoice = new Invoice();
        invoice.setBooking(booking);
        invoice.setUser(user);
        invoice.setVehicle(vehicle);
        invoice.setDescription(req.getDescription());
        invoice.setAmount(req.getAmount());
        invoice.setStatus("UNPAID");
        invoice.setPaymentMode(null);

        invoiceDao.saveInvoice(invoice);

        return invoice;
    }

    // ===============================
    // USER: Get MY invoices
    // ===============================
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/my")
    public List<Invoice> getMyInvoices() {

        String email =
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getName();

        User user = userDao.getUserByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        return invoiceDao.getInvoicesByUser(user.getId());
    }

    // ===============================
    // ADMIN: Get all invoices
    // ===============================
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/all")
    public List<Invoice> getAll() {
        return invoiceDao.getAllInvoices();
    }

    // ===============================
    // USER: Pay only his invoice
    // ===============================
    @PreAuthorize("hasRole('USER')")
    @PutMapping("/pay/{id}")
    public String payInvoice(@PathVariable int id,
                             @RequestParam String mode) {

        Invoice inv = invoiceDao.getInvoiceById(id);

        if (inv == null)
            throw new RuntimeException("Invoice not found");

        String email =
                SecurityContextHolder.getContext()
                        .getAuthentication()
                        .getName();

        User user = userDao.getUserByEmail(email);

        if (user == null)
            throw new RuntimeException("User not found");

        // SECURITY CHECK
        if (inv.getUser().getId() != user.getId())
            throw new RuntimeException("You cannot pay others invoice");

        inv.setStatus("PAID");
        inv.setPaymentMode(mode);
        invoiceDao.updateInvoice(inv);

        return "PAID";
    }

    // ===============================
    // ADMIN: Get invoice by booking
    // ===============================
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/by-booking/{bookingId}")
    public Invoice getInvoiceByBooking(@PathVariable int bookingId) {

        Invoice invoice = invoiceDao.getInvoiceByBookingId(bookingId);

        if (invoice == null)
            throw new RuntimeException("Invoice not found for this booking");

        return invoice;
    }

    // ===============================
    // DTO
    // ===============================
    public static class InvoiceRequest {

        private Integer bookingId;
        private int userId;
        private int vehicleId;
        private String description;
        private double amount;

        public Integer getBookingId() { return bookingId; }
        public void setBookingId(Integer bookingId) { this.bookingId = bookingId; }

        public int getUserId() { return userId; }
        public void setUserId(int userId) { this.userId = userId; }

        public int getVehicleId() { return vehicleId; }
        public void setVehicleId(int vehicleId) { this.vehicleId = vehicleId; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public double getAmount() { return amount; }
        public void setAmount(double amount) { this.amount = amount; }
    }
}
