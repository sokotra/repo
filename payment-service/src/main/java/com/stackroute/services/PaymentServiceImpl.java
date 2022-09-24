package com.stackroute.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.model.PaymentDetails;
import com.stackroute.repository.PaymentDetailsRepository;

@Service
public class PaymentServiceImpl implements PaymentService {
		
	
	@Autowired
	private PaymentDetailsRepository paymentDetailsRepository;
			
	@Override
	public PaymentDetails saveOnePayment(PaymentDetails paymentDetails) {
		return paymentDetailsRepository.save(paymentDetails);
	}
	
	@Override
	public PaymentDetails findById(String orderId) {
		Optional<PaymentDetails> findById= paymentDetailsRepository.findById(orderId);
		PaymentDetails paymentDetails=findById.get();
		return paymentDetails;
	}


	@Override
	public PaymentDetails updateOrderWithBookingId(String orderId, String bookingId) {
		PaymentDetails payment= findById(orderId);
		payment.setbookingId(bookingId);
		return paymentDetailsRepository.save(payment);
	}


}
