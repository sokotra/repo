package com.stackroute.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter 
@Setter 
@AllArgsConstructor
@ToString
@NoArgsConstructor
public class Review {
	
	 private String clientEmailId;
	 private String comment;

}
