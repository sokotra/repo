package com.stackroute.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.model.Client;
@Repository
public interface AuthenticationRepo extends JpaRepository<Client,String> {

	Client findByEmailId(String emailId);
	
	Client findByEmailIdAndPassword(String emailId, String password);

	
}
