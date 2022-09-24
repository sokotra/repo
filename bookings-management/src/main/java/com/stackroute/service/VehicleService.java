package com.stackroute.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import com.stackroute.exception.VehicleNotFoundException;
import com.stackroute.model.CarBooking;
import com.stackroute.model.Vehicle;
import com.stackroute.repository.CarBookingRepo;
import com.stackroute.repository.VehicleRepo;

@Service 
public class VehicleService implements VehicleServInterface {
	
	@Autowired
	private VehicleRepo vrepo;
	@Autowired
	private CarBookingRepo carbookrep;
	
	public List<Vehicle> getallvehiclesbyloc(String location) {
		
		return vrepo.findByLocation(location);
		
	}
    public List<CarBooking> getallfuturebooking(String vehicleNo) throws VehicleNotFoundException{
		
    	if(!vrepo.existsById(vehicleNo)) {
			throw new VehicleNotFoundException("Vechile not found");
		}
		LocalDate lt =  LocalDate.now();
	    List<CarBooking> booklist=carbookrep.findByToDatetimeGreaterThanAndVehicleNo(lt,vehicleNo);
	    return booklist;

	}
    public List<Vehicle> get_available_vechile(String location,LocalDate from ,LocalDate to) {
		
		List<Vehicle> list= vrepo.findByLocation(location);
		LocalDate lt =  LocalDate.now();
		List<Vehicle> finalVehicleList=new ArrayList<>();
		
		for(Vehicle v:list) {
			List<CarBooking> booklist=carbookrep.findByToDatetimeGreaterThanAndVehicleNo(lt,v.getVehicleNo());
			if(booklist==null || booklist.size()==0) {
				finalVehicleList.add(v);
			}else {
				boolean flag=true;
				for(CarBooking booking:booklist) {
					if(booking.getToDatetime().isBefore(from) || booking.getFromDatetime().isAfter(to) ) {
						flag =true;
					}else {
						flag=false;
						break;
					}
					
				}
				if(flag) {
					finalVehicleList.add(v);
				}
			}
		}
		return finalVehicleList;
		
	}
	public Vehicle addvehicle(Vehicle vehicle) {
		vehicle.setNoOftrips("0");
		vehicle.setAvailable(true);
		vrepo.save(vehicle);
		return vehicle;
		
	}
	public Vehicle vehiclesdetails(String vehicleNo) throws VehicleNotFoundException {
		
		if(!vrepo.existsById(vehicleNo)) {
			throw new VehicleNotFoundException("Vechile not found");
		}
		return vrepo.findById(vehicleNo).orElse(null);
		
	}
    public List<Vehicle> getvehiclebyfilters(Vehicle vehicle,LocalDate from,LocalDate to) {
    	Example<Vehicle> veh_type = Example.of(vehicle);
    	List<Vehicle>  list = vrepo.findAll(veh_type);
    	LocalDate lt =  LocalDate.now();
		List<Vehicle> finalVehicleList=new ArrayList<>();

		for(Vehicle v:list) {
			List<CarBooking> booklist=carbookrep.findByToDatetimeGreaterThanAndVehicleNo(lt,v.getVehicleNo());
			if(booklist==null || booklist.size()==0) {
				finalVehicleList.add(v);
			}else {
				boolean flag=true;
				for(CarBooking booking:booklist) {
					if(!(booking.getToDatetime().isBefore(from) || booking.getFromDatetime().isAfter(to)) ) {
						flag=false;
						break;
					}
				}
				if(flag) {
					finalVehicleList.add(v);
				}
			}
		}
		return finalVehicleList;
		
	
	}
    public List<Vehicle> vehiclesByVendor(String vendorEmailId) {

		return  vrepo.findByVendorEmailId(vendorEmailId);
	}

	
	

}
