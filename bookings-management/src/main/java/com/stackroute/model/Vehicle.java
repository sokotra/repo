package com.stackroute.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter 
@AllArgsConstructor
@NoArgsConstructor
@Document
public class Vehicle {
	 @Id
	 private String vehicleNo;
	 private String vendorEmailId;
	 private String brandName;
	 private String modelName;
	 private String colour;
	 private String category;
	 private String fuel;
	 private String transmission;
	 private String average;
	 private String location;
	 private String fare;
	 private String description;
	 private boolean available;
	 private String yearOfpurchase;
	 private String seats;
	 private String noOftrips;
	 private String image;
	 
	

}
