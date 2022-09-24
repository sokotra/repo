package com.stackroute.model;


import java.time.LocalDate;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter 
@Setter 
@AllArgsConstructor
@Document
public class CarBooking {
	 @Id
	 private String bookingId;
	 private String clientEmailId;
	 private String vehicleNo;
	 private LocalDate fromDatetime;
	 private LocalDate toDatetime;
	 private double totalFare;

}
