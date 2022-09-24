package com.stackroute.service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.stackroute.exception.VehicleNotFoundException;
import com.stackroute.model.CarBooking;
import com.stackroute.model.Vehicle;
import com.stackroute.repository.CarBookingRepo;
import com.stackroute.repository.VehicleRepo;

@Service
@Component
public class CarBookingService implements CarBookingInte {
	
	@Autowired
	private CarBookingRepo carbookrepo;
	@Autowired
	private VehicleRepo vehiclerepo;
	
	public CarBooking addbooking( CarBooking booking) throws VehicleNotFoundException{
		
     	LocalDate fromDatetime=booking.getFromDatetime();
        LocalDate toDatetime = booking.getToDatetime();
		
		if(!(vehiclerepo.existsById(booking.getVehicleNo()))) {
			throw new VehicleNotFoundException("Vehicle not found");
		}
		
		Vehicle vehicle =vehiclerepo.findById(booking.getVehicleNo()).orElse(null);
		if(vehicle==null) {
			return null;
		}
		vehicle.setNoOftrips(String.valueOf(Integer.parseInt(vehicle.getNoOftrips())+1));
		vehiclerepo.save(vehicle);
		int days=Period.between(fromDatetime,toDatetime).getDays();
		double totalfare=Double.parseDouble(vehicle.getFare())*days;
		if(days>1) {
			totalfare=totalfare*(1-(0.05*(days-1)));
		}
		booking.setTotalFare(totalfare);
		
		carbookrepo.save(booking);
		
		return booking;
		
		}
	
	public List<CarBooking> getbookingsbyEmail(String clientEmailId) {
		// TODO Auto-generated method stub
		
		 return carbookrepo.findByClientEmailId(clientEmailId);

		}
	
	public CarBooking getbookingbyID(String bookingId) {
		// TODO Auto-generated method stub
		
		 return carbookrepo.findById(bookingId).orElse(null);

		}
	public List<CarBooking> getbookingbyno(String vehicleNo)  throws VehicleNotFoundException {
		// TODO Auto-generated method stub
		if(!(vehiclerepo.existsById(vehicleNo))) {
			throw new VehicleNotFoundException("Vehicle not found");
		}
		 return carbookrepo.findByVehicleNo(vehicleNo);

		}
	

}
