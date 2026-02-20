package com.syed.vehicleservice.dao;

import java.util.List;
import com.syed.vehicleservice.entity.Invoice;

public interface InvoiceDao {
	void saveInvoice(Invoice invoice);

	Invoice getInvoiceById(int id);

	List<Invoice> getInvoicesByUser(int userId);

	void updateInvoice(Invoice invoice);

	Invoice getInvoiceByBookingId(int bookingId);

	List<Invoice> getAllInvoices();
}
