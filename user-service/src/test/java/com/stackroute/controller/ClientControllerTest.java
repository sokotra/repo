package com.stackroute.controller;

import com.stackroute.exception.ClientAlreadyPresent;
import com.stackroute.exception.ClientNotFoundException;
import com.stackroute.model.Address;
import com.stackroute.model.Client;
import com.stackroute.service.ClientServiceImpl;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
public class ClientControllerTest {

    @Mock
    private ClientServiceImpl clientServiceImpl;

    @InjectMocks
    private ClientController clientController;

    ResponseEntity responseEntity;

    Client c1 = new Client("client1@gmail.com","9483859","client1","Client1",null,null);

    Address a1 = new Address("34","2","Bangalore","Karnataka",560035,"India");

    @Test
    public void getByEmailIdSuccess() throws ClientNotFoundException {
        Mockito.when(clientServiceImpl.getByEmailId(c1.getEmailId())).thenReturn(c1);
        responseEntity = new ResponseEntity<>(c1, HttpStatus.OK);
        assertEquals(responseEntity,clientController.getByEmailId("client1@gmail.com"));
    }

    @Test
    public void addClientSuccess() throws ClientAlreadyPresent {
        Mockito.when(clientServiceImpl.addClient(c1)).thenReturn(c1);
        responseEntity = new ResponseEntity<>(c1,HttpStatus.OK);
        assertEquals(responseEntity,clientController.addClient(c1));
    }

    @Test
    public void addAddressSuccess(){
        Mockito.when(clientServiceImpl.addAddress(c1.getEmailId(),a1)).thenReturn(a1);
        responseEntity = new ResponseEntity<>(a1,HttpStatus.OK);
        assertEquals(responseEntity,clientController.addAddress(c1.getEmailId(),a1));

    }

    @Test
    public void updateClientSuccess() throws ClientNotFoundException{
        Mockito.when(clientServiceImpl.updateClientDetails(c1.getEmailId(),c1)).thenReturn(c1);
        responseEntity = new ResponseEntity<>(c1,HttpStatus.OK);
        assertEquals(responseEntity,clientController.updateVendor(c1.getEmailId(), c1));
    }

    @Test
    public void getByEmailIdFailure() throws ClientNotFoundException {
        Mockito.when(clientServiceImpl.getByEmailId(c1.getEmailId())).thenThrow(new ClientNotFoundException("No User found"));
        responseEntity = new ResponseEntity<>("No User found", HttpStatus.BAD_REQUEST);
        assertEquals(responseEntity, clientController.getByEmailId(c1.getEmailId()));
    }

    @Test
    public void addClientFailure() throws ClientAlreadyPresent {
        Mockito.when(clientServiceImpl.addClient(c1)).thenThrow(new ClientAlreadyPresent("Email Id already registered"));
        responseEntity = new ResponseEntity<>("Email Id already registered",HttpStatus.BAD_REQUEST);
        assertEquals(responseEntity,clientController.addClient(c1));
    }

    @Test
    public void updateClientFailure() throws ClientNotFoundException{
        Mockito.when(clientServiceImpl.updateClientDetails(c1.getEmailId(),c1)).thenThrow(new ClientNotFoundException("Client not found"));
        responseEntity = new ResponseEntity<>("Client not found",HttpStatus.BAD_REQUEST);
        assertEquals(responseEntity,clientController.updateVendor(c1.getEmailId(), c1));
    }

}
