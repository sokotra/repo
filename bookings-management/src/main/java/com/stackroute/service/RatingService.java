package com.stackroute.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.exception.VehicleNotFoundException;
import com.stackroute.model.Rating;
import com.stackroute.model.Review;
import com.stackroute.repository.RatingRepository;
import com.stackroute.repository.VehicleRepo;



@Service 
public class RatingService implements RatingServiceInterface {
	
	@Autowired 
	private RatingRepository ratingrepo;
	@Autowired
	private VehicleRepo vehrepo;
	
	
	public Rating addcomment(String vehicleNo, String comment,String clientEmailId) throws VehicleNotFoundException {
		// TODO Auto-generated method stub
		if(comment==null||clientEmailId==null) {
			throw new VehicleNotFoundException("Comment OR ClientemailId is null");
		}
		if(!vehrepo.existsById(vehicleNo)) {
			throw new VehicleNotFoundException("Vechile not found");
		}
		Rating rat= ratingrepo.findById(vehicleNo).orElse(new Rating(vehicleNo,0.0,0, new ArrayList<Review>()));
		List<Review> rs=rat.getListReview();
		rs.add(0, new Review(clientEmailId,comment) );
		ratingrepo.save(rat);
		return rat;
		
		}
	
	public List<Review> getcomment(String vehicleNo) throws VehicleNotFoundException{
		// TODO Auto-generated method stub
		if(!vehrepo.existsById(vehicleNo)) {
			throw new VehicleNotFoundException("Vechile not found");
		}
		Rating rat= ratingrepo.findById(vehicleNo).orElse(null);
		if(rat!=null) {
			return rat.getListReview();
		}else {
			 return new ArrayList<Review>();
		}
		 
		}
	
	public Rating addrating(String vehicleNo, int individularat) throws VehicleNotFoundException {
		// TODO Auto-generated method stub
		if(!vehrepo.existsById(vehicleNo)) {
			throw new VehicleNotFoundException("Vechile not found");
		}
		Rating rat= ratingrepo.findById(vehicleNo).orElse(new Rating(vehicleNo,0.0,0, new ArrayList<Review>()));
		double variable=rat.getAvg()*rat.getCount()+individularat;
		int div =rat.getCount()+1;
		rat.setAvg(variable/div);
		rat.setCount(rat.getCount()+1);
		
		ratingrepo.save(rat);
		return rat;
		}
	public double getrating(String vehicleNo) throws VehicleNotFoundException {
		// TODO Auto-generated method stub
		if(!vehrepo.existsById(vehicleNo)) {
			throw new VehicleNotFoundException("Vechile not found");
		}
		 Rating rat= ratingrepo.findById(vehicleNo).orElse(null);
		 if(rat!=null) {
		 return rat.getAvg();
		 }else {
			 return 0;
		 }

		}
	public Rating getratingCount(String vehicleNo) throws VehicleNotFoundException {
		// TODO Auto-generated method stub
		if(!vehrepo.existsById(vehicleNo)) {
			throw new VehicleNotFoundException("Vechile not found");
		}
		Rating rat= ratingrepo.findById(vehicleNo).orElse(null);
		if(rat!=null) {
			return rat;
		}else {
			return null;
		}
	}


}
