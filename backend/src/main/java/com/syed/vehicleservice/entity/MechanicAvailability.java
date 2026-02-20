package com.syed.vehicleservice.entity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "mechanic_availability")
public class MechanicAvailability {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private LocalDate date;

	@ManyToOne
	@JoinColumn(name = "mechanic_id")
	private Mechanic mechanic;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public Mechanic getMechanic() {
		return mechanic;
	}

	public void setMechanic(Mechanic mechanic) {
		this.mechanic = mechanic;
	}
}
