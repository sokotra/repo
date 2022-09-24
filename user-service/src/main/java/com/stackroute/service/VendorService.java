package com.stackroute.service;

import com.stackroute.exception.VendorAlreadyPresent;
import com.stackroute.exception.VendorNotFoundException;
import com.stackroute.model.Address;
import com.stackroute.model.Vendor;

public interface VendorService {

    Vendor addVendor(Vendor vendor) throws VendorAlreadyPresent;

    Vendor getByEmailId(String emailId) throws VendorNotFoundException;

    Address addAddress(String emailId, Address address);

    Vendor updateVendorDetails(String emailId,Vendor vendor) throws VendorNotFoundException;
}
