package com.stackroute.service;

import java.util.List;

import com.stackroute.exception.VehicleNotFoundException;
import com.stackroute.model.Rating;
import com.stackroute.model.Review;

public interface RatingServiceInterface {
	
	Rating addcomment(String vehicleNo, String comment,String clientEmailId) throws VehicleNotFoundException ;
	
	List<Review> getcomment(String vehicleNo) throws VehicleNotFoundException ;
	
	Rating addrating(String vehicleNo, int individularat) throws VehicleNotFoundException ;
	double getrating(String vehicleNo) throws VehicleNotFoundException ;

}
