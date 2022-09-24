package com.stackroute.service;

import com.stackroute.RMQ.Producer;
import com.stackroute.RMQ.UserDTO;
import com.stackroute.exception.VendorAlreadyPresent;
import com.stackroute.exception.VendorNotFoundException;
import com.stackroute.model.Address;
import com.stackroute.model.Vendor;
import com.stackroute.repository.ClientRepo;
import com.stackroute.repository.VendorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VendorServiceImpl implements VendorService{

    @Autowired
    private VendorRepo vendorRepo;

    @Autowired
    private Producer producer;
    @Autowired
    private ClientRepo clientRepo;
    Vendor vendorResult;

    @Override
    public Vendor getByEmailId(String emailId) throws VendorNotFoundException {
        if(vendorRepo.findById(emailId).isPresent()){
            vendorResult = vendorRepo.findById(emailId).get();
            return vendorResult;
        }
        else{
            throw new VendorNotFoundException("Email id not found");
        }
    }
    @Override
    public Vendor addVendor(Vendor vendor) throws VendorAlreadyPresent {
        if(vendorRepo.findById(vendor.getEmailId()).isPresent() || clientRepo.findById(vendor.getEmailId()).isPresent()){
            throw new VendorAlreadyPresent("Email Id is already registered");
        }
        vendorRepo.save(vendor);
        UserDTO userDTO = new UserDTO("VENDOR",vendor.getEmailId(),vendor.getPassword());
        producer.sendDetailsToQueue(userDTO);
        return vendor;
    }

    @Override
    public Address addAddress(String emailId, Address address){
        Vendor v = vendorRepo.findById(emailId).get();
        v.setAddress(address);
        vendorRepo.save(v);
        return v.getAddress();
    }

    @Override
    public Vendor updateVendorDetails(String emailId, Vendor vendor) throws VendorNotFoundException{
        Vendor vendor1 = vendorRepo.findById(emailId).get();
        if(vendor1==null){
            throw new VendorNotFoundException("Email not registered");
        }
        if(vendor.getName()!=null){
            vendor1.setName(vendor.getName());
        }
        if(vendor.getPassword()!=null){
            vendor1.setPassword(vendor.getPassword());
        }
        if(vendor.getMobileNumber()!=null){
            vendor1.setMobileNumber(vendor.getMobileNumber());
        }
        if(vendor.getImage()!=null){
            vendor1.setImage(vendor.getImage());
        }
        if(vendor.getAddress()!=null){
            vendor1.setAddress(vendor.getAddress());
        }
        vendorResult = vendorRepo.save(vendor1);
        return vendorResult;
    }
}
