package com.stackroute.controller;

import org.apache.commons.lang3.RandomStringUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stackroute.model.PaymentDetails;
import com.stackroute.services.PaymentService;

	@RestController
//	@CrossOrigin("*")
	@RequestMapping("/api/v5")
	public class PaymentController {
			
		
	@Autowired
	private PaymentService paymentService;

	
	//creating payment 
	@PostMapping("/payment")
	@ResponseBody
	public String createPayment(@RequestParam ("amount") String data) throws RazorpayException {
		
		int amt=Integer.parseInt(data);
		
		RazorpayClient client = new RazorpayClient("rzp_test_83ogGOdlkFyTUL", "hmTWA4gC8KN41v5jJhUsZpra");
		String receipt = RandomStringUtils.randomNumeric(6);		
		
		JSONObject ob=new JSONObject();
		
		ob.put("amount", amt);
		ob.put("currency", "INR");
		ob.put("receipt", receipt);
		
		Order order = client.orders.create(ob);
		
		//For saving into mysql
		
		PaymentDetails paymentDetails = new PaymentDetails();
		
		paymentDetails.setOrderId(order.get("id"));
		paymentDetails.setAmount(order.get("amount")+"");
		paymentDetails.setReceipt(order.get("receipt"));
		paymentDetails.setStatus(order.get("status"));
		paymentDetails.setCurrency(order.get("currency"));
		paymentDetails.setLocalDateTime();
		paymentDetails.setbookingId(order.get("receipt"));
		
		paymentService.saveOnePayment(paymentDetails);
		return order.toString();
	
	}
	
			// For getting payment by order-id
			@GetMapping("/get/{id}")
			
			public ResponseEntity<?> getonePayment(@PathVariable String id) {
			return new ResponseEntity<>(paymentService.findById(id), HttpStatus.OK);
			
			}
			
			// For updating order with booking Id
			@PatchMapping("/updateorder")
			
			public ResponseEntity<?> updateOrderWithBookingId(@RequestParam String id,@RequestParam String bookingId ){
			return new ResponseEntity<>(paymentService.updateOrderWithBookingId(id, bookingId), HttpStatus.OK);
			
		}

}



