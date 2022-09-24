package com.stackroute.service;

import com.stackroute.exception.ClientAlreadyPresent;
import com.stackroute.exception.ClientNotFoundException;
import com.stackroute.model.Address;
import com.stackroute.model.Client;

public interface ClientService {

    Client addClient(Client client) throws ClientAlreadyPresent;
    Client getByEmailId(String emailId) throws ClientNotFoundException;
    Address addAddress (String emailId, Address address);
    Client updateClientDetails(String emailId,Client client) throws ClientNotFoundException;
}
