package com.stackroute.controller;

import com.stackroute.model.Address;
import com.stackroute.model.Vendor;
import com.stackroute.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin("*")
@RequestMapping("/api/v1")
public class VendorController {

    @Autowired
    private VendorService vendorService;

    ResponseEntity responseEntity;

    @GetMapping("/vendor/{emailId}")
    public ResponseEntity<Vendor> getByEmailId(@PathVariable String emailId){
        try{
            Vendor v = vendorService.getByEmailId(emailId);
            responseEntity = new ResponseEntity<>(v, HttpStatus.OK);
        }
        catch (Exception e){
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @PostMapping("/vendor/register")
    public ResponseEntity<Vendor> addVendor(@RequestBody Vendor vendor){
        try{
            Vendor v = vendorService.addVendor(vendor);
            responseEntity = new ResponseEntity<>(v, HttpStatus.OK);
        }
        catch (Exception e){
            responseEntity = new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @PutMapping("/vendor/{emailId}/address")
    public ResponseEntity<Address> addAddress(@PathVariable String emailId, @RequestBody Address address) {
        try{
            Address a = vendorService.addAddress(emailId, address);
            responseEntity = new ResponseEntity<>(a, HttpStatus.OK);
        }
        catch (Exception e){
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @PutMapping("/vendor/{emailId}")
    public ResponseEntity<Vendor> updateVendor(@PathVariable String emailId,@RequestBody Vendor vendor){
        try{
            Vendor v = vendorService.updateVendorDetails(emailId,vendor);
            responseEntity = new ResponseEntity<>(v,HttpStatus.OK);
        }
        catch (Exception e){
            responseEntity = new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }
}