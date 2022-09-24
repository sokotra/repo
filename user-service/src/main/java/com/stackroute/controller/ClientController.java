package com.stackroute.controller;

import com.stackroute.model.Address;
import com.stackroute.model.Client;
import com.stackroute.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
//@CrossOrigin("*")
@RequestMapping("/api/v1")
public class ClientController {

    @Autowired
    private ClientService clientService;

    ResponseEntity responseEntity;

    @GetMapping("/client/{emailId}")
    public ResponseEntity<Client> getByEmailId(@PathVariable String emailId) {
        try {
            Client c = clientService.getByEmailId(emailId);
            responseEntity = new ResponseEntity<>(c, HttpStatus.OK);
        } catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @PostMapping("/client/register")
    public ResponseEntity<Client> addClient(@RequestBody Client client) {
        try {
            Client c = clientService.addClient(client);
            responseEntity = new ResponseEntity<>(c, HttpStatus.OK);
        }
        catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @PutMapping("/client/{emailId}/address")
    public ResponseEntity<Address> addAddress(@PathVariable String emailId, @RequestBody Address address) {
        try {
            Address a = clientService.addAddress(emailId, address);
            responseEntity = new ResponseEntity<>(a, HttpStatus.OK);
        } catch (Exception e) {
            responseEntity = new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }

    @PutMapping("/client/{emailId}")
    public ResponseEntity<Client> updateVendor(@PathVariable String emailId,@RequestBody Client client){
        try{
            Client c = clientService.updateClientDetails(emailId,client);
            responseEntity = new ResponseEntity<>(c,HttpStatus.OK);
        }
        catch (Exception e){
            responseEntity = new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
        }
        return responseEntity;
    }
}