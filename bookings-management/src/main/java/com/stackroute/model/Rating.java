package com.stackroute.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter 
@Setter 
@AllArgsConstructor
@ToString
@Document
public class Rating {
	
	 @Id
	 private String vehicleNo;
	 private double avg;
	 private int count;
	 private List<Review> listReview;
	 
	
	
	
}
