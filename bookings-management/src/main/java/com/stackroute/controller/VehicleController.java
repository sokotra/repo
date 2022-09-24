package com.stackroute.controller;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stackroute.exception.VehicleNotFoundException;
import com.stackroute.model.CarBooking;
import com.stackroute.model.Vehicle;
import com.stackroute.service.VehicleService;

//@CrossOrigin("*")
@RestController
@RequestMapping("/api/v4")
public class VehicleController {
	@Autowired
	private VehicleService vehservice;
	
	@GetMapping("/getvehicles/{location}")
	public List<Vehicle> getvehiclebyloc(@PathVariable String location){
		return vehservice.getallvehiclesbyloc(location);
	}
	@GetMapping("/getallfuturebooking/{vehicleNo}")
	public List<CarBooking> getallfuturebooking(@PathVariable String vehicleNo) throws VehicleNotFoundException{
		return vehservice.getallfuturebooking(vehicleNo);
	}
	@GetMapping("/getallavailablevehicle")
	public List<Vehicle> get_available_vechile(@RequestParam ("location") String location,@RequestParam ("from") String fday, @RequestParam ("to") String eday ){
		LocalDate from= LocalDate.parse(fday);
		LocalDate to = LocalDate.parse(eday);
		
		return vehservice.get_available_vechile(location,from,to);
	}
	
	@PostMapping("/addvehicle")
	public ResponseEntity<Vehicle> addvehicle(@RequestBody  Vehicle veh){
		Vehicle vehicle =vehservice.addvehicle( veh);
		return new ResponseEntity<>(vehicle,HttpStatus.ACCEPTED);

	}
	@GetMapping("/getvehicledetails/{vehicleNo}")
	public Vehicle vehiclesdetails(@PathVariable String vehicleNo) throws VehicleNotFoundException{
		return vehservice.vehiclesdetails(vehicleNo);
	}
	
	@GetMapping("/getvehiclebyfilters")
	public List<Vehicle> getvehiclebyfilters( @RequestParam  String veh,@RequestParam ("from") String from, @RequestParam ("to") String to) throws JsonProcessingException {
		LocalDate fromd= LocalDate.parse(from);
		LocalDate tod = LocalDate.parse(to);
		Vehicle  vehicle = new ObjectMapper().readValue(veh,Vehicle.class);

		
		List<Vehicle> ls = vehservice.getvehiclebyfilters(vehicle,fromd ,tod);
		
		
		return ls;
		
	}
	@GetMapping("/getvehicleByVendor/{vendorEmailId}")
	public List<Vehicle> vehiclesByVendor(@PathVariable String vendorEmailId) throws VehicleNotFoundException{
		return vehservice.vehiclesByVendor(vendorEmailId);
	}

    	
		
	
	

   }
