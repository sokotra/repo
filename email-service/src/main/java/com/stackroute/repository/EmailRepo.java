package com.stackroute.repository;

import com.stackroute.model.Email;
//import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface EmailRepo extends MongoRepository<Email,String> {

}
