package com.stackroute.service;


import java.util.List;

import com.stackroute.exception.VehicleNotFoundException;
import com.stackroute.model.CarBooking;


public interface CarBookingInte {
	
	CarBooking addbooking(CarBooking booking) throws VehicleNotFoundException ;
	
	List<CarBooking> getbookingsbyEmail(String clientEmailId) ;
	
	CarBooking getbookingbyID(String bookingId) ;

	List<CarBooking> getbookingbyno(String vehicleNo) throws VehicleNotFoundException ;

}
