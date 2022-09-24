package com.stackroute.repository;


import java.time.LocalDate;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.model.CarBooking;

@Repository
public interface CarBookingRepo extends MongoRepository<CarBooking, String> {
	
	List<CarBooking> findByClientEmailId(String clientEmailId);
	List<CarBooking> findByVehicleNo(String vehicleNo);
	List<CarBooking> findByToDatetimeGreaterThan(LocalDate currentDate);
	List<CarBooking> findByToDatetimeGreaterThanAndVehicleNo(LocalDate currentDate,String vehicleNo);
	

}
