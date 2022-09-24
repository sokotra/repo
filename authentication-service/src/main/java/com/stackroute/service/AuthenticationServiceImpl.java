package com.stackroute.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.exception.UserNotFoundException;
import com.stackroute.model.Client;
import com.stackroute.repository.AuthenticationRepo;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {
	
    @Autowired
	AuthenticationRepo repo;
  
    //To add a client in db
    @Override
	public boolean addClient(Client client) throws UserNotFoundException {
		if (client != null) {
			repo.save(client);
			return true;
		}
		else {
			throw new UserNotFoundException("The entered details are not valid");
		}
	}
    
    //Get the Client object by emailId
	@Override
	 public Client getUserByUserEmail(String emailId) {
	        return repo.findByEmailId(emailId);
	    }
			
	//Get the Client object by emailId and Password
	 @Override
	    public Client getUserByUserEmailAndPassword(String emailId, String password) {

	        return repo.findByEmailIdAndPassword(emailId, password);
	    }
    
	 @Override
	 public Client changePassword(Client client) throws Exception {
		 Client client1 = repo.findByEmailId(client.getEmailId());
		 if(client1==null) {
			 throw new Exception();
		 }
		 client1.setPassword(client.getPassword());
		 repo.save(client1);
		 return client1;
	 }
	
	}

	
	


