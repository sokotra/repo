package com.stackroute.service;

import com.stackroute.exception.VendorAlreadyPresent;
import com.stackroute.exception.VendorNotFoundException;
import com.stackroute.model.Address;
import com.stackroute.model.Vendor;
import com.stackroute.repository.VendorRepo;
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
public class VendorServiceImplTest {

    @Autowired
    private VendorService vendorService;

    @MockBean
    private VendorRepo vendorRepo;

    Address a1 = new Address("34", "2", "Bangalore", "Karnataka", 560035, "India");

    Optional<Vendor> v1 = Optional.of(new Vendor("vendor1@gmail.com", "Vendor1", "8948957654", "vendor1", null, a1));
    Vendor v2 = new Vendor("vendor2@gmail.com", "Vendor2", "9586955948", "vendor2", null, a1);

    @Test
    public void getByEmailIdSuccess() throws VendorNotFoundException {
        Mockito.when(vendorRepo.findById("vendor1@gmail.com")).thenReturn(v1);
        assertEquals(v1.get(), vendorService.getByEmailId("vendor1@gmail.com"));
    }

    @Test
    public void addVendorSuccess() throws VendorAlreadyPresent {
        Mockito.when(vendorRepo.save(v1.get())).thenReturn(v1.get());
        assertEquals(v1.get(), vendorService.addVendor(v1.get()));
    }

    @Test
    public void addAddressSuccess() {
        Mockito.when(vendorRepo.findById("vendor1@gmail.com")).thenReturn(v1);
        Mockito.when(vendorRepo.save(v1.get())).thenReturn(v1.get());
        assertEquals(a1,vendorService.addAddress(v1.get().getEmailId(),v1.get().getAddress()));
    }

    @Test
    public void updateVendorDetailsSuccess() throws VendorNotFoundException {
        Mockito.when(vendorRepo.findById("vendor1@gmail.com")).thenReturn(v1);
        Mockito.when(vendorRepo.save(v1.get())).thenReturn(v1.get());
        assertEquals(v1.get(), vendorService.updateVendorDetails("vendor1@gmail.com", v1.get()));
    }
}
