package com.stackroute.service;

import com.stackroute.exception.ClientAlreadyPresent;
import com.stackroute.exception.ClientNotFoundException;
import com.stackroute.model.Address;
import com.stackroute.model.Client;
import com.stackroute.repository.ClientRepo;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ClientServiceImplTest {

    @Autowired
    private ClientService clientService;

    @MockBean
    private ClientRepo clientRepo;

    Address a1 = new Address("34","2","Bangalore","Karnataka",560035,"India");

    Optional<Client> c1 = Optional.of(new Client("client1@gmail.com", "9483859", "client1", "Client1", null, a1));

    Client c2 = new Client("client1@gmail.com", "9483859", "client1", "Client1", null, a1);
    @Test
    public void getByEmailIdSuccess() throws ClientNotFoundException {
        Mockito.when(clientRepo.findById("client1@gmail.com")).thenReturn(c1);
        assertEquals(c1.get(), clientService.getByEmailId("client1@gmail.com"));
    }

    @Test
    public void addClientSuccess() throws ClientAlreadyPresent {
        Mockito.when(clientRepo.save(c1.get())).thenReturn(c1.get());
        assertEquals(c1.get(), clientService.addClient(c1.get()));
    }

    @Test
    public void addAddressSuccess() {
        Mockito.when(clientRepo.findById("client1@gmail.com")).thenReturn(c1);
        Mockito.when(clientRepo.save(c1.get())).thenReturn(c1.get());
        assertEquals(a1,clientService.addAddress(c1.get().getEmailId(),c1.get().getAddress()));
    }

    @Test
    public void updateVendorDetailsSuccess() throws ClientNotFoundException {
        Mockito.when(clientRepo.findById("client1@gmail.com")).thenReturn(c1);
        Mockito.when(clientRepo.save(c1.get())).thenReturn(c1.get());
        assertEquals(c1.get(), clientService.updateClientDetails("client1@gmail.com", c1.get()));
    }


}
