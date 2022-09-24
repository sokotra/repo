package com.stackroute.services;

import com.stackroute.model.PaymentDetails;

public interface PaymentService {
	
	
	    PaymentDetails saveOnePayment( PaymentDetails paymentDetails);
	   
	    PaymentDetails updateOrderWithBookingId (String orderId, String bookingId);

	     PaymentDetails findById(String orderId); 

	   
	   
}
