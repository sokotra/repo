package com.stackroute.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stackroute.model.Chat;

@Repository
public interface ChatRepository extends MongoRepository<Chat, String>{

	List<Chat> findByClientEmailIdAndVendorEmailId(String clientEmailId, String vendorEmailId);
List<Chat> findByClientEmailId(String clientEmailId);
             List<Chat> findByVendorEmailId(String vendorEmailId);
}
