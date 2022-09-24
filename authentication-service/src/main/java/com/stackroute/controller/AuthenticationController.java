package com.stackroute.controller;

import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.stackroute.exception.UserNotFoundException;
import com.stackroute.model.Client;
import com.stackroute.repository.AuthenticationRepo;
import com.stackroute.security.TokenGenerator;
import com.stackroute.service.AuthenticationServiceImpl;

@RestController
//@CrossOrigin("*")
@RequestMapping("api/v2")
public class AuthenticationController {
	
	@Autowired
	AuthenticationServiceImpl authservice;
	
	@Autowired
	AuthenticationRepo repo;
	
	@Autowired
	TokenGenerator token;
	
	ResponseEntity entity;
	
	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	// Testing endpoint
	@PostMapping(value = "/add")
    @ResponseBody
    public ResponseEntity<Client> addStudent(@RequestBody Client client) throws UserNotFoundException{
        authservice.addClient(client);
        return new ResponseEntity<Client>(client, HttpStatus.CREATED);
    }
	
   //Endpoint to check if the token is validated
	@GetMapping("/hello")
    public  String hello(){
        return "hi";
    }
	
	@PutMapping("/password")
	@ResponseBody
	public ResponseEntity<Client> changePassword(@RequestBody Client client) throws UserNotFoundException{
		try {
        authservice.changePassword(client);
        return new ResponseEntity<Client>(client, HttpStatus.CREATED);
		}
		catch(Exception ex) {
			return new ResponseEntity("The emailId entered is not valid ", HttpStatus.BAD_REQUEST);	
		}
    }
	
	//Login controller method
	@PostMapping("/login")
	@ResponseBody
	public ResponseEntity login(@RequestBody Client client) throws UserNotFoundException{
		
		try {
		Map<String, String> map= null;
		//get emailId and password from the db
		Client client1 = authservice.getUserByUserEmailAndPassword(client.getEmailId(), client.getPassword());
		System.out.println(client.getPassword());
		
		if(client1.getEmailId().equalsIgnoreCase(client.getEmailId()) && client1.getPassword().equalsIgnoreCase(client.getPassword())) {
			//if the client details are validated then generate token
			map = token.generateToken(client);
		}
			entity = new ResponseEntity(map, HttpStatus.OK);
		
		}
		catch(Exception ex) {
		entity = new ResponseEntity("Error/Client Emailid or Password Incorrect ", HttpStatus.BAD_REQUEST);	
			
		}
		
			return entity;
	}
	
	
}
