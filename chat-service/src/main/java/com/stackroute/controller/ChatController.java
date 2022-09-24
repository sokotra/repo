package com.stackroute.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.stackroute.model.Chat;
import com.stackroute.model.Message;
import com.stackroute.repository.ChatRepository;
import com.stackroute.service.ChatServiceImpl;

@RestController
//@CrossOrigin("*")
@RequestMapping("api/v3")
public class ChatController {
	
	@Autowired
	ChatServiceImpl service;
	
	@Autowired
	ChatRepository repo;
	
	@PostMapping("/chat1")
	@ResponseBody
	public ResponseEntity<Chat> addMessage(@RequestBody Message message) throws Exception{
		try {
		message.setCurrentDateTime(LocalDateTime.now());
		Chat chat = service.addMessages(message);
		return new ResponseEntity<Chat>(chat, HttpStatus.OK);
		}
		catch(Exception e) {
			return new ResponseEntity("The message cannot be null", HttpStatus.BAD_REQUEST);
		}
	}
	
	//get all vendors chatting with a particular client
	@GetMapping("/vendors/{clientEmailId}")
	public ResponseEntity<List<String>> getAllVendors( @PathVariable String clientEmailId) throws Exception{
	
		List<String> list;
		try {
			list = service.getAllVendors(clientEmailId);
			
			return new ResponseEntity<List<String>>(list, HttpStatus.OK);
		}
		catch(Exception e) {
			return new ResponseEntity("The entered emailId is not valid, or check role", HttpStatus.BAD_REQUEST);
		}
		} 
		
	
	
	//get all the messages between 2 parties
	@GetMapping("/getMessages/{clientEmailId}/{vendorEmailId}")
	public ResponseEntity<List<Message>> getAllMessages(@PathVariable String clientEmailId, @PathVariable  String vendorEmailId){
		List<Message> list = service.getAllMessages(clientEmailId, vendorEmailId);
	return new ResponseEntity<List<Message>>(list, HttpStatus.OK);
		
	}
	
	
	//get all clients chatting to a particular vendor
	@GetMapping("/clients/{vendorEmailId}")
	public ResponseEntity<List<String>> getAllClients( @PathVariable String vendorEmailId) throws Exception{
		try {
		List<String> list1 = service.getAllClients(vendorEmailId);
		
		 return new ResponseEntity<List<String>>(list1, HttpStatus.OK);
		}
		catch(Exception e) {
			return new ResponseEntity("The entered emailId is not valid, or check role", HttpStatus.BAD_REQUEST);
		}
	}
     
}
