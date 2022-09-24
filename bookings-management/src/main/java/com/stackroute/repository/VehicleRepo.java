package com.stackroute.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


import com.stackroute.model.Vehicle;

@Repository
public interface VehicleRepo extends MongoRepository<Vehicle, String>{
	

	List<Vehicle> findByLocation(String loc);
	List<Vehicle> findByVendorEmailId(String vendorEmailId);



}
