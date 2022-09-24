package com.stackroute.repository;

import com.stackroute.model.Vendor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface VendorRepo extends MongoRepository<Vendor,String> {
}
