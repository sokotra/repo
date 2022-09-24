package com.stackroute.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.anyString;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.stackroute.exception.UserNotFoundException;
import com.stackroute.model.Client;
import com.stackroute.repository.AuthenticationRepo;

@SpringBootTest
@RunWith(SpringJUnit4ClassRunner.class)
public class AuthenticationServiceImplTest {

	@InjectMocks
	AuthenticationServiceImpl service;
	
	@Mock
	AuthenticationRepo repo;
	
Client client = new Client("utsav.arora@gmail.com", "waheguru");

@Test
public void testAddClient() throws UserNotFoundException {
	
	assertEquals(true, service.addClient(client));
}


@Test
public void testGetUserByUserEmail() {
	Mockito.when(repo.findByEmailId(anyString())).thenReturn(client);
	assertEquals(client, service.getUserByUserEmail("utsav.arora@gmail.com"));
}

@Test
public void testGetUserByEmailAndPassword() {
	Mockito.when(repo.findByEmailIdAndPassword(anyString(), anyString())).thenReturn(client);
	assertEquals(client, service.getUserByUserEmailAndPassword("utsav.arora@gmail.com", "waheguru"));
}
	
	
}

	
