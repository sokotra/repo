package com.stackroute.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stackroute.exception.VehicleNotFoundException;
import com.stackroute.model.CarBooking;
import com.stackroute.service.CarBookingService;
//@CrossOrigin("*")
@RestController
@RequestMapping("/api/v4")
public class CarBookingController {
	
	@Autowired
	private CarBookingService service;
	//@RequestParam ("veh") String vehicleNo,@RequestParam ("clientEmailId") String clientEmailId,
	//@RequestParam ("fromDatetime") String fromDatetime,@RequestParam ("toDatetime") String toDatetime
	@PostMapping("/addbook")
	public ResponseEntity<CarBooking> addbooking(@RequestBody CarBooking booking ) throws VehicleNotFoundException{
		
		CarBooking carbook =service.addbooking(booking);
		return new ResponseEntity<>(carbook,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/getbookingdetails/{bookingId}")
	public CarBooking getbookingdetails(@PathVariable String bookingId) {
		return service.getbookingbyID(bookingId);
	}
	@GetMapping("/getallbooking/{clientEmailId}")
	public List<CarBooking> getallbooking(@PathVariable String clientEmailId){
		return service.getbookingsbyEmail(clientEmailId);
	}
	@GetMapping("/getallbookingbyvehicle/{vehicleNo}")
	public List<CarBooking> getallbookingbyvehicle(@PathVariable String vehicleNo) throws VehicleNotFoundException{
		return service.getbookingbyno(vehicleNo);
	}
	 
	

}
