package com.stackroute.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.stackroute.exception.UserNotFoundException;
import com.stackroute.model.Client;
import com.stackroute.security.TokenGenerator;
import com.stackroute.service.AuthenticationServiceImpl;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class AuthenticationControllerTest {
	
	@InjectMocks
	AuthenticationController controller;
	
	@Mock
	AuthenticationServiceImpl service;
	
	@Mock
	TokenGenerator token;
	
	
	ResponseEntity entity;
	
	
	Client client = new Client("utsav.arora@gmail.com", "waheguru");
	
	@Test
	public void testWhenCredintialsValid() throws  UserNotFoundException {
		
		 Map<String, String> map = new HashMap<>();
		 map.put("authenticated", "37857hdjfhkjvfjro94");
		 entity = new ResponseEntity(map, HttpStatus.OK);
		
	    Mockito.when(service.getUserByUserEmailAndPassword(anyString(), anyString())).thenReturn(client);
	    Mockito.when(token.generateToken(client)).thenReturn(map);
	    
	    assertEquals(entity, controller.login(client));
	    
	    
	}
	@Test
	public void testWhenCredintialsInValid() throws  UserNotFoundException {
		
		 entity = new ResponseEntity("Error/Client Emailid or Password Incorrect ", HttpStatus.BAD_REQUEST);
		  
	    Mockito.when(service.getUserByUserEmailAndPassword("utsav.arora@gmail.com", "wrongpassword")).thenReturn(client);
	    
	    
	    assertEquals(entity, controller.login(client));
	    
	    
	}
	@Test
	public void testWhenCredintialsNull() throws  UserNotFoundException {
		Client clientnull = new Client(null,null);
		 entity = new ResponseEntity("Error/Client Emailid or Password Incorrect ", HttpStatus.BAD_REQUEST);
		  
	    Mockito.when(service.getUserByUserEmailAndPassword(clientnull.getEmailId(), clientnull.getPassword())).thenReturn(client);
	    
	    
	    assertEquals(entity, controller.login(client));
	    
	    
	}
	
	

}
