package com.stackroute.service;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.stackroute.exception.VehicleNotFoundException;
import com.stackroute.model.Rating;
import com.stackroute.model.Review;
import com.stackroute.repository.RatingRepository;
import com.stackroute.repository.VehicleRepo;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class RatingServiceTest {
	@InjectMocks
	public RatingService ratingService;

	@Mock
	public VehicleRepo vehrepo;
	@Mock
	public RatingRepository ratingRepo;
	
	Rating finalrating;
	Rating rating ,rating_null,rating2,rating3;
	Review rev,rev_null;
	List<Review> list,list_null;
	Optional<Rating> oprating;
	boolean flag;
	
	
	@BeforeEach
	public void init() {
		
		list = new ArrayList<Review>();
		list_null = new ArrayList<Review>();
		rev = new Review("testuser@test.com","good");
		rev_null = new Review();
		rev_null=null;
		list.add(rev);
		rating = new Rating("KL08AA0005",4,1,list);
		rating_null= new Rating("KL08AA0005",4,1,list_null);
		rating2 = new Rating("KL08AA0006",0.0,0,list);
		rating3 = new Rating("KL08AA0005",4.5,2,list_null);
		
	    flag=true;
	    oprating= Optional.ofNullable(new Rating("KL08AA0005",4,1,list));
		
		
	}
	@Test
	public void testWhenaddCommentIsOK() throws VehicleNotFoundException  {
		
		
		Rating finalrating = rating2;
		System.out.println(rating2);
		
	    Mockito.when(vehrepo.existsById(anyString())).thenReturn(true);
	    assertEquals(finalrating.toString(), ratingService.addcomment("KL08AA0006","good","testuser@test.com").toString());
	    
	    
	}
//	@Rule
//	public ExpectedException exceptionRule = ExpectedException.none();
//	@Test
//	public void whenExceptionThrown_thenRuleIsApplied() throws VehicleNotFoundException {
//	    exceptionRule.expect(VehicleNotFoundException.class);
//	    exceptionRule.expectMessage("Vechile not found");
//	    Mockito.when(vehrepo.existsById(anyString())).thenReturn(false);
//	    ratingService.addcomment("KL08AA6","good","testuser@test.com");
//	    //Integer.parseInt("1a");
//	}
//	@Test
//	public void testWhenaddCommentIsNull() throws VehicleNotFoundException  {
//		
//		
//		VehicleNotFoundException excep= new VehicleNotFoundException("Vechile not found");
//		//System.out.println(rating2);
//		
//	    Mockito.when(vehrepo.existsById(anyString())).thenReturn(false);
//	    assertEquals(excep, ratingService.addcomment("KL08AA6","good","testuser@test.com"));
//	    
//	    
//	}
	@Test
	public void testWhengetCommentIsOK() throws VehicleNotFoundException  {
		
		
		Optional<Rating> tocheck = oprating;
		
		Mockito.when(vehrepo.existsById(anyString())).thenReturn(true);
	    Mockito.when(ratingRepo.findById(anyString())).thenReturn(oprating);
	    assertEquals(tocheck.get().getListReview(), ratingService.getcomment("KL08AA0006"));
	    
	    
	}
	@Test
	public void testWhenaddratingIsOK() throws VehicleNotFoundException  {
		
		
		Rating tocheck = rating_null;
		
		Mockito.when(vehrepo.existsById(anyString())).thenReturn(true);
	  //  Mockito.when(ratingRepo.findById(anyString())).thenReturn(oprating);
	    assertEquals(tocheck.toString(), ratingService.addrating("KL08AA0005",4).toString());
	    
	    
	}
	@Test
	public void testWhenaddratingforexistingVehicle() throws VehicleNotFoundException  {
		
		
		Rating tocheck = rating3;
		Optional<Rating> oprating = Optional.ofNullable(rating_null);
		Mockito.when(vehrepo.existsById(anyString())).thenReturn(true);
	    Mockito.when(ratingRepo.findById(anyString())).thenReturn(oprating);
	    assertEquals(tocheck.toString(), ratingService.addrating("KL08AA0005",5).toString());   
	}
	@Test
	public void testWhenaddgetRating() throws VehicleNotFoundException  {
		
		//ratingService.getrating("KL08AA0005")
		double b=4.0;
		Optional<Rating> oprating = Optional.ofNullable(rating);
		Mockito.when(vehrepo.existsById(anyString())).thenReturn(true);
	    Mockito.when(ratingRepo.findById(anyString())).thenReturn(oprating);
	    assertEquals(b, ratingService.getrating("KL08AA0005"), 1);
	}

}
