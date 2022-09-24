package com.stackroute.service;

import com.stackroute.RMQ.Producer;
import com.stackroute.RMQ.UserDTO;
import com.stackroute.exception.ClientAlreadyPresent;
import com.stackroute.exception.ClientNotFoundException;
import com.stackroute.model.Address;
import com.stackroute.model.Client;
import com.stackroute.repository.ClientRepo;
import com.stackroute.repository.VendorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClientServiceImpl implements ClientService{

    @Autowired
    private ClientRepo clientRepo;

    @Autowired
    private Producer producer;
    @Autowired
    private VendorRepo vendorRepo;
    Client clientResult;

    @Override
    public Client getByEmailId(String emailId) throws ClientNotFoundException {
        if(clientRepo.findById(emailId).isPresent()){
            clientResult = clientRepo.findById(emailId).get();
            return clientResult;
        }
        else{
            throw new ClientNotFoundException("Email id not found");
        }
    }
    @Override
    public Client addClient(Client client) throws ClientAlreadyPresent {
        if(clientRepo.findById(client.getEmailId()).isPresent() || vendorRepo.findById(client.getEmailId()).isPresent()){
            throw new ClientAlreadyPresent("Email Id is already registered");
        }
        clientRepo.save(client);
        UserDTO userDTO = new UserDTO("CLIENT",client.getEmailId(),client.getPassword());
        producer.sendDetailsToQueue(userDTO);
        return client;
    }

    @Override
    public Address addAddress(String emailId, Address address) {
        Client client = clientRepo.findById(emailId).get();
        client.setAddress(address);
        clientRepo.save(client);
        return client.getAddress();
    }

    @Override
    public Client updateClientDetails(String emailId,Client client) throws ClientNotFoundException{
        Client client1 = clientRepo.findById(emailId).get();
        if(client1==null){
            throw new ClientNotFoundException("Email not registered");
        }
        if(client.getName()!=null){
            client1.setName(client.getName());
        }
        if(client.getPassword()!=null){
            client1.setPassword(client.getPassword());
        }
        if(client.getMobileNumber()!=null){
            client1.setMobileNumber(client.getMobileNumber());
        }
        if(client.getImage()!=null){
            client1.setImage(client.getImage());
        }
        if(client.getAddress()!=null){
            client1.setAddress(client.getAddress());
        }
        return clientRepo.save(client1);
    }
}
