package com.stackroute.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.stackroute.model.Client;

@Service
public class CustomClientDetailsService implements UserDetailsService{
	
	@Autowired
	AuthenticationService authservice;

	// Spring security default method implementation
	@Override
	public UserDetails loadUserByUsername(String emailId) throws UsernameNotFoundException {
		 final Client client = authservice.getUserByUserEmail(emailId);
	        if (client == null) {
	            throw new UsernameNotFoundException("Client '" + emailId + "' not found");
	        }
	        return org.springframework.security.core.userdetails.User//
	                .withUsername(emailId)//
	                .password(client.getPassword())//
	                .authorities("CLIENT","VENDOR")
	                .accountExpired(false)//
	                .accountLocked(false)//
	                .credentialsExpired(false)//
	                .disabled(false)//
	                .build();
	}

}