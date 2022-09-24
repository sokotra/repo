package com.stackroute.service;

import java.time.LocalDate;
import java.util.List;

import com.stackroute.exception.VehicleNotFoundException;
import com.stackroute.model.CarBooking;
import com.stackroute.model.Vehicle;

public interface VehicleServInterface {
	
    List<Vehicle> getallvehiclesbyloc(String location) ;
    List<CarBooking> getallfuturebooking(String vehicleNo) throws VehicleNotFoundException ;
    List<Vehicle> get_available_vechile(String location,LocalDate from ,LocalDate to);
    Vehicle addvehicle(Vehicle vehicle) ;
    Vehicle vehiclesdetails(String vehicleNo) throws VehicleNotFoundException ;
    List<Vehicle> getvehiclebyfilters(Vehicle vehicle, LocalDate from, LocalDate to) ;
   
}
