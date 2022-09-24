package com.stackroute.controller;

import com.stackroute.exception.VendorAlreadyPresent;
import com.stackroute.exception.VendorNotFoundException;
import com.stackroute.model.Address;
import com.stackroute.model.Vendor;
import com.stackroute.service.VendorServiceImpl;
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
public class VendorControllerTest {

    @Mock
    private VendorServiceImpl vendorServiceImpl;

    @InjectMocks
    private VendorController vendorController;

    ResponseEntity responseEntity;

    Vendor v1 = new Vendor("vendor1@gmail.com","Vendor1","8948957654","vendor1",null,null);
    Address a1 = new Address("34","2","Bangalore","Karnataka",560035,"India");
    @Test
    public void getByEmailIdSuccess() throws VendorNotFoundException {
        Mockito.when(vendorServiceImpl.getByEmailId(v1.getEmailId())).thenReturn(v1);
        responseEntity = new ResponseEntity<>(v1, HttpStatus.OK);
        assertEquals(responseEntity,vendorController.getByEmailId("vendor1@gmail.com"));
    }

    @Test
    public void addVendorSuccess() throws VendorAlreadyPresent{
        Mockito.when(vendorServiceImpl.addVendor(v1)).thenReturn(v1);
        responseEntity = new ResponseEntity<>(v1,HttpStatus.OK);
        assertEquals(responseEntity,vendorController.addVendor(v1));
    }

    @Test
    public void addAddressSuccess(){
        Mockito.when(vendorServiceImpl.addAddress(v1.getEmailId(),a1)).thenReturn(a1);
        responseEntity = new ResponseEntity<>(a1,HttpStatus.OK);
        assertEquals(responseEntity,vendorController.addAddress(v1.getEmailId(),a1));

    }

    @Test
    public void updateVendorSuccess() throws VendorNotFoundException{
        Mockito.when(vendorServiceImpl.updateVendorDetails(v1.getEmailId(),v1)).thenReturn(v1);
        responseEntity = new ResponseEntity<>(v1,HttpStatus.OK);
        assertEquals(responseEntity,vendorController.updateVendor(v1.getEmailId(), v1));
    }

    @Test
    public void getByEmailIdFailure() throws VendorNotFoundException {
        Mockito.when(vendorServiceImpl.getByEmailId(v1.getEmailId())).thenThrow(new VendorNotFoundException("User not Found"));
        responseEntity = new ResponseEntity<>("User not Found", HttpStatus.BAD_REQUEST);
        assertEquals(responseEntity,vendorController.getByEmailId("vendor1@gmail.com"));
    }

    @Test
    public void addVendorFailure() throws VendorAlreadyPresent{
        Mockito.when(vendorServiceImpl.addVendor(v1)).thenThrow(new VendorAlreadyPresent("Email Id already registered"));
        responseEntity = new ResponseEntity<>("Email Id already registered",HttpStatus.BAD_REQUEST);
        assertEquals(responseEntity,vendorController.addVendor(v1));
    }

    @Test
    public void updateVendorFailure() throws VendorNotFoundException{
        Mockito.when(vendorServiceImpl.updateVendorDetails(v1.getEmailId(),v1)).thenThrow(new VendorNotFoundException("User not found"));
        responseEntity = new ResponseEntity<>("User not found",HttpStatus.BAD_REQUEST);
        assertEquals(responseEntity,vendorController.updateVendor(v1.getEmailId(), v1));
    }
}
