package com.stackroute.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stackroute.exception.VehicleNotFoundException;
import com.stackroute.model.Rating;
import com.stackroute.model.Review;
import com.stackroute.service.RatingService;

//@CrossOrigin("*")
@RestController
@RequestMapping("/api/v4")
public class RatingController {
	
	@Autowired
	private RatingService rtservice;
	
	
	@PostMapping("/addreview")
	public ResponseEntity<Rating> addreview(@RequestBody Review review ,@RequestParam ("vehicleNo") String vehicleNo) throws VehicleNotFoundException{
		if(vehicleNo==null || review==null ) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

		Rating rat =rtservice.addcomment(vehicleNo,review.getComment(),review.getClientEmailId());
		return new ResponseEntity<>(rat,HttpStatus.ACCEPTED);
	
	}
	@GetMapping("/getreview/{vehicleNo}")
	public ResponseEntity<List<Review>> getreview(@PathVariable  String vehicleNo) throws VehicleNotFoundException {
		
		if(vehicleNo==null) {
				 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			 }
		
		 List<Review> list= rtservice.getcomment( vehicleNo);
		 return new ResponseEntity<>(list,HttpStatus.ACCEPTED);
		 
	}
	
	
	@PostMapping("/addrating/{vehicleNo}&{rating}")
	public ResponseEntity<Rating> addrating(@PathVariable String vehicleNo,@PathVariable int rating) throws VehicleNotFoundException{
		if(vehicleNo==null) {
			 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		 }
	
		if(rating>5 || rating <1) {
			return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
		}
		Rating ratng = rtservice.addrating( vehicleNo,  rating);
		return new ResponseEntity<>(ratng,HttpStatus.ACCEPTED);

	}
	@GetMapping("/getrating/{vehicleNo}")
	public ResponseEntity<Double> getrating(@PathVariable String vehicleNo) throws VehicleNotFoundException{
		 if(vehicleNo==null) {
			 return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		 }
		
		double rating=rtservice.getrating( vehicleNo);
		return new ResponseEntity<>(rating,HttpStatus.OK);
	
		 
	}
	@GetMapping("/getratingCount/{vehicleNo}")
	public ResponseEntity<Rating> getratingCount(@PathVariable String vehicleNo) throws VehicleNotFoundException{
		if(vehicleNo==null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

		Rating rating=rtservice.getratingCount( vehicleNo);
		return new ResponseEntity<>(rating,HttpStatus.OK);


	}

	
	
	
	

}
