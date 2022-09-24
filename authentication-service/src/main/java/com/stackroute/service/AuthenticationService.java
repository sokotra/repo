package com.stackroute.service;

import org.springframework.stereotype.Service;

import com.stackroute.exception.UserNotFoundException;
import com.stackroute.model.Client;
@Service
public interface AuthenticationService {

	 boolean addClient(Client client) throws UserNotFoundException;
	
	 Client getUserByUserEmail(String emailId);
	  Client getUserByUserEmailAndPassword(String emailId, String password);
	  

	Client changePassword(Client client) throws Exception;
	
}
