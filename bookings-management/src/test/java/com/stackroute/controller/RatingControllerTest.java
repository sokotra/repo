package com.stackroute.controller;


import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;

import java.util.ArrayList;
import java.util.List;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.stackroute.exception.VehicleNotFoundException;
import com.stackroute.model.Rating;
import com.stackroute.model.Review;
import com.stackroute.model.Vehicle;
import com.stackroute.repository.VehicleRepo;
import com.stackroute.service.RatingService;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class RatingControllerTest {
	@InjectMocks
	public RatingController ratingController;
	@Mock
	public RatingService rtservice;
	@Mock
	public VehicleRepo vehrepo;
	ResponseEntity entity;
	Rating rating ,rating_null;
	Review rev,rev_null;
	List<Review> list,list_null;
	
	
	Vehicle vehicle = new Vehicle("KL08AA0005","testvendor@test.com","TATA","N-20","WHITE","SEDAN","DIESEL", "MANUAL","10","NEW DELHI","2500","BATA", true,"2021", "4","0",null);
	
	
	
	@BeforeEach
	public void init() {
		
		list = new ArrayList<Review>();
		list_null = new ArrayList<Review>();
		rev = new Review("testuser@test.com","good");
		rev_null = new Review();
		rev_null=null;
	//	list_null.add(rev_null);
		list.add(rev);
		rating = new Rating("KL08AA0005",4,1,list);
		rating_null= new Rating("KL08AA0005",4,1,list_null);
		
		
	}
	
	
	

	@Test
	public void testWhenReviewIsNull() throws VehicleNotFoundException  {
		
		
		 entity = new ResponseEntity(HttpStatus.NO_CONTENT);
		
	    Mockito.when(rtservice.addcomment(anyString(), anyString(),anyString())).thenReturn(rating_null);
	    assertEquals(entity, ratingController.addreview(rev_null,"KL08AA0005"));
	    
	    
	}
	@Test
	public void testWhenReviewIsOK() throws VehicleNotFoundException  {
		
	
		 entity = new ResponseEntity(rating,HttpStatus.ACCEPTED);
		
	    Mockito.when(rtservice.addcomment(anyString(), anyString(),anyString())).thenReturn(rating);
	    assertEquals(entity, ratingController.addreview(rev,"KL08AA0005"));
	    
	    
	}
	
	@Test
	public void testWhenGetReviewIsOK() throws VehicleNotFoundException  {
		
		
		 entity = new ResponseEntity(list,HttpStatus.ACCEPTED);
		
	    Mockito.when(rtservice.getcomment("KL08AA0005")).thenReturn(list);
	   
	   
	    assertEquals(entity, ratingController.getreview("KL08AA0005"));
	    
	    
	}
	@Test
	public void testWhenAddRatingIsOK() throws VehicleNotFoundException  {
		
		
		 entity = new ResponseEntity(rating_null,HttpStatus.ACCEPTED);
		
		
	    Mockito.when(rtservice.addrating("KL08AA0005",4)).thenReturn(rating_null);
	   
	    assertEquals(entity, ratingController.addrating("KL08AA0005",4));
	    
	    
	}
	@Test
	public void testWhenAddRatingIsInavalid() throws VehicleNotFoundException  {
		
		
		 entity = new ResponseEntity(HttpStatus.NOT_ACCEPTABLE);
         assertEquals(entity, ratingController.addrating("KL08AA0005",6));
	    
	    
	}
	@Test
	public void testWhenGetRatingIsOK() throws VehicleNotFoundException  {
		
		
		 entity = new ResponseEntity(4.0,HttpStatus.OK);
		 Mockito.when(rtservice.getrating("KL08AA0005")).thenReturn(4.0);
         assertEquals(entity, ratingController.getrating("KL08AA0005"));
	    
	    
	}
}
